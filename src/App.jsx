import { useEffect, useMemo, useRef, useState } from "react";
import { store } from "./store.js";
import { TEXT, num, taka, normalizePhone } from "./utils.js";
import Swatch from "./components/Swatch.jsx";

const L = store.lang;
const t = TEXT[L] || TEXT.bn;
const byId = Object.fromEntries(store.products.map((p) => [p.id, p]));
const CART_KEY = `cart:${store.nameLatin}`;
// Shops without a WhatsApp number take orders through Messenger instead.
const HAS_WA = Boolean(store.whatsapp);
const MESSENGER_URL = `https://m.me/${store.messengerUsername}`;
const CHAT_URL = HAS_WA ? `https://wa.me/${store.whatsapp}` : MESSENGER_URL;

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((l) => byId[l.id]) : [];
  } catch {
    return [];
  }
}

function ProductImage({ p }) {
  const [broken, setBroken] = useState(false);
  return p.image && !broken ? (
    <img
      src={p.image}
      alt={p.name}
      loading="lazy"
      referrerPolicy="no-referrer"
      className="swatch"
      onError={() => setBroken(true)}
    />
  ) : (
    <Swatch id={p.id} color={p.color || "#2C4A8C"} label={p.name} />
  );
}

export default function App() {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(loadCart);
  const [open, setOpen] = useState(null); // product being viewed
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage blocked: cart still works for this visit */
    }
  }, [cart]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return store.products.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (!q || `${p.name} ${p.description || ""}`.toLowerCase().includes(q))
    );
  }, [cat, query]);

  const count = cart.reduce((n, l) => n + l.qty, 0);

  function add(id, size, qty = 1) {
    setCart((c) => {
      const i = c.findIndex((l) => l.id === id && l.size === size);
      if (i === -1) return [...c, { id, size, qty }];
      const next = [...c];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
  }

  function setQty(i, qty) {
    setCart((c) => (qty < 1 ? c.filter((_, j) => j !== i) : c.map((l, j) => (j === i ? { ...l, qty } : l))));
  }

  const inBag = (id) => cart.some((l) => l.id === id);

  return (
    <>
      {store.previewNote && <p className="preview-note">{store.previewNote}</p>}
      <header className="topbar">
        <a href="#top" className="brand">
          {store.name}
        </a>
        <button className="bag-btn" onClick={() => setBagOpen(true)} aria-label={`${t.bag}: ${num(count, L)}`}>
          <BagIcon />
          <span>{t.bag}</span>
          {count > 0 && <span className="badge">{num(count, L)}</span>}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="latin">{store.nameLatin}</p>
            <h1>{store.tagline}</h1>
            <p className="about">{store.about}</p>
            <div className="hero-actions">
              <a className="btn primary" href="#shop">
                {t.browse}
              </a>
              <a className="btn ghost" href={CHAT_URL} target="_blank" rel="noreferrer">
                {HAS_WA ? t.chat : t.chatMessenger}
              </a>
            </div>
          </div>
          <div className="hero-quilt" aria-hidden="true">
            {store.products.slice(0, 4).map((p) => (
              <div key={p.id} className="quilt-piece">
                <ProductImage p={p} />
              </div>
            ))}
          </div>
        </section>

        <section className="facts" aria-label={`${t.delivery} / ${t.payment}`}>
          {store.delivery.map((d) => (
            <div key={d.id}>
              <strong>{d.label}</strong>
              <span>
                {taka(d.fee, L)} · {d.time}
              </span>
            </div>
          ))}
          <div>
            <strong>{t.payment}</strong>
            <span>{store.payment.join(", ")}</span>
          </div>
        </section>

        <section id="shop" className="shop">
          <div className="filters">
            <div className="chips" role="tablist">
              {[{ id: "all", label: t.all }, ...store.categories].map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={cat === c.id}
                  className={cat === c.id ? "chip on" : "chip"}
                  onClick={() => setCat(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <input
              className="search"
              type="search"
              placeholder={t.search}
              aria-label={t.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {visible.length === 0 ? (
            <p className="empty">{t.noResults}</p>
          ) : (
            <ul className="grid">
              {visible.map((p) => {
                const sold = p.inStock === false;
                return (
                  <li key={p.id} className={sold ? "card sold" : "card"}>
                    <button className="card-img" onClick={() => setOpen(p)} aria-label={p.name}>
                      <ProductImage p={p} />
                      {sold ? <span className="tag dark">{t.soldOut}</span> : p.tag && <span className="tag">{p.tag}</span>}
                    </button>
                    <div className="card-body">
                      <h3>
                        <button onClick={() => setOpen(p)}>{p.name}</button>
                      </h3>
                      <p className="price">
                        {taka(p.price, L)}
                        {p.oldPrice && <s>{taka(p.oldPrice, L)}</s>}
                      </p>
                      <button
                        className={inBag(p.id) ? "btn add in" : "btn add"}
                        disabled={sold}
                        onClick={() => (p.sizes ? setOpen(p) : add(p.id, null))}
                      >
                        {sold ? t.soldOut : inBag(p.id) && !p.sizes ? `✓ ${t.added}` : t.add}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      <footer className="footer">
        <div>
          <p className="foot-brand">{store.name}</p>
          <p>{store.address}</p>
        </div>
        <div>
          <p className="foot-label">{t.contact}</p>
          {HAS_WA && store.phoneDisplay && (
            <p>
              <a href={`tel:+${store.whatsapp}`}>{store.phoneDisplay}</a>
            </p>
          )}
          <p>
            <a href={store.facebookUrl} target="_blank" rel="noreferrer">
              Facebook
            </a>
            {"  ·  "}
            <a href={CHAT_URL} target="_blank" rel="noreferrer">
              {HAS_WA ? "WhatsApp" : "Messenger"}
            </a>
          </p>
        </div>
        <div>
          <p className="foot-label">{t.hours}</p>
          <p>{store.hours}</p>
        </div>
        {store.builtBy && (
          <p className="credit">
            {t.builtBy}{" "}
            {store.builtByUrl ? (
              <a href={store.builtByUrl} target="_blank" rel="noreferrer">
                {store.builtBy}
              </a>
            ) : (
              store.builtBy
            )}
          </p>
        )}
      </footer>

      {open && (
        <ProductSheet
          p={open}
          onClose={() => setOpen(null)}
          onAdd={(size, qty) => {
            add(open.id, size, qty);
            setOpen(null);
            setBagOpen(true);
          }}
        />
      )}
      {bagOpen && <Bag cart={cart} setQty={setQty} onClose={() => setBagOpen(false)} />}
    </>
  );
}

function Sheet({ onClose, side, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    ref.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [onClose]);
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className={`sheet ${side}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close" onClick={onClose} aria-label={t.close}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function ProductSheet({ p, onClose, onAdd }) {
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const sold = p.inStock === false;
  return (
    <Sheet onClose={onClose} side="center" title={p.name}>
      <div className="detail">
        <div className="detail-img">
          <ProductImage p={p} />
        </div>
        <div className="detail-body">
          <h2>{p.name}</h2>
          <p className="price big">
            {taka(p.price, L)}
            {p.oldPrice && <s>{taka(p.oldPrice, L)}</s>}
          </p>
          {p.description && <p className="desc">{p.description}</p>}
          {p.sizes && (
            <fieldset className="sizes">
              <legend>{t.size}</legend>
              {p.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  className={size === s ? "size on" : "size"}
                  onClick={() => {
                    setSize(s);
                    setWarn(false);
                  }}
                >
                  {num(s, L)}
                </button>
              ))}
              {warn && <p className="err">{t.chooseSize}</p>}
            </fieldset>
          )}
          <div className="qty-row">
            <span>{t.qty}</span>
            <Stepper value={qty} onChange={(v) => setQty(Math.max(1, v))} />
          </div>
          <button
            className="btn primary wide"
            disabled={sold}
            onClick={() => (p.sizes && !size ? setWarn(true) : onAdd(size, qty))}
          >
            {sold ? t.soldOut : t.add}
          </button>
        </div>
      </div>
    </Sheet>
  );
}

function Stepper({ value, onChange }) {
  return (
    <span className="stepper">
      <button type="button" onClick={() => onChange(value - 1)} aria-label="−">
        −
      </button>
      <span aria-live="polite">{num(value, L)}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="+">
        +
      </button>
    </span>
  );
}

function Bag({ cart, setQty, onClose }) {
  const [delivery, setDelivery] = useState(store.delivery[0].id);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const [manualText, setManualText] = useState("");

  const zone = store.delivery.find((d) => d.id === delivery);
  const subtotal = cart.reduce((n, l) => n + byId[l.id].price * l.qty, 0);
  const total = subtotal + (cart.length ? zone.fee : 0);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = t.errName;
    if (!normalizePhone(form.phone)) e.phone = t.errPhone;
    if (form.address.trim().length < 6) e.address = t.errAddress;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function orderText() {
    const lines = cart.map((l, i) => {
      const p = byId[l.id];
      const size = l.size ? ` (${t.size}: ${l.size})` : "";
      return `${num(i + 1, L)}. ${p.name}${size} × ${num(l.qty, L)} = ${taka(p.price * l.qty, L)}`;
    });
    return [
      `🛍️ ${t.orderTitle} — ${store.name}`,
      "",
      ...lines,
      "",
      `${t.subtotal}: ${taka(subtotal, L)}`,
      `${t.deliveryFee} (${zone.label}): ${taka(zone.fee, L)}`,
      `${t.total}: ${taka(total, L)}`,
      "",
      `${t.yourName}: ${form.name.trim()}`,
      `${t.phone}: ${normalizePhone(form.phone)}`,
      `${t.address}: ${form.address.trim()}`,
      form.note.trim() ? `${t.note}: ${form.note.trim()}` : null,
    ]
      .filter((x) => x !== null)
      .join("\n");
  }

  function sendWhatsApp() {
    if (!validate()) return;
    window.open(`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(orderText())}`, "_blank");
  }

  async function sendMessenger() {
    if (!validate()) return;
    const text = orderText();
    // Start the copy and open Messenger in the same tap, so phones don't block the new tab.
    const copying = navigator.clipboard?.writeText(text) ?? Promise.reject();
    window.open(MESSENGER_URL, "_blank");
    try {
      await copying;
      setToast(t.copied);
      setManualText("");
    } catch {
      setToast(t.copyManually);
      setManualText(text);
    }
  }

  const field = (key, label, props = {}) => (
    <label className={errors[key] ? "field bad" : "field"}>
      <span>{label}</span>
      {props.rows ? (
        <textarea rows={props.rows} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
      ) : (
        <input
          {...props}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      )}
      {errors[key] && <em className="err">{errors[key]}</em>}
    </label>
  );

  return (
    <Sheet onClose={onClose} side="right" title={t.bag}>
      <h2 className="bag-title">{t.bag}</h2>
      {cart.length === 0 ? (
        <p className="empty">{t.emptyBag}</p>
      ) : (
        <>
          <ul className="lines">
            {cart.map((l, i) => {
              const p = byId[l.id];
              return (
                <li key={`${l.id}|${l.size}`}>
                  <div className="thumb">
                    <ProductImage p={p} />
                  </div>
                  <div className="line-info">
                    <p className="line-name">{p.name}</p>
                    {l.size && (
                      <p className="muted">
                        {t.size}: {num(l.size, L)}
                      </p>
                    )}
                    <div className="line-row">
                      <Stepper value={l.qty} onChange={(v) => setQty(i, v)} />
                      <strong>{taka(p.price * l.qty, L)}</strong>
                    </div>
                    <button className="link" onClick={() => setQty(i, 0)}>
                      {t.remove}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <fieldset className="zones">
            <legend>{t.delivery}</legend>
            {store.delivery.map((d) => (
              <label key={d.id} className={delivery === d.id ? "zone on" : "zone"}>
                <input type="radio" name="zone" checked={delivery === d.id} onChange={() => setDelivery(d.id)} />
                <span>{d.label}</span>
                <span className="muted">
                  {taka(d.fee, L)} · {d.time}
                </span>
              </label>
            ))}
          </fieldset>

          <dl className="totals">
            <div>
              <dt>{t.subtotal}</dt>
              <dd>{taka(subtotal, L)}</dd>
            </div>
            <div>
              <dt>{t.deliveryFee}</dt>
              <dd>{taka(zone.fee, L)}</dd>
            </div>
            <div className="grand">
              <dt>{t.total}</dt>
              <dd>{taka(total, L)}</dd>
            </div>
          </dl>

          <div className="form">
            {field("name", t.yourName, { autoComplete: "name" })}
            {field("phone", t.phone, { inputMode: "tel", autoComplete: "tel", placeholder: "01XXXXXXXXX" })}
            {field("address", t.address, { rows: 2 })}
            {field("note", t.note, { rows: 2 })}
          </div>

          {HAS_WA ? (
            <>
              <button className="btn whatsapp wide" onClick={sendWhatsApp}>
                {t.sendWhatsApp}
              </button>
              <button className="btn ghost wide" onClick={sendMessenger}>
                {t.sendMessenger}
              </button>
            </>
          ) : (
            <button className="btn messenger wide" onClick={sendMessenger}>
              {t.sendMessenger}
            </button>
          )}
          {toast && (
            <p className="toast" role="status">
              {toast}
            </p>
          )}
          {manualText && (
            <textarea className="manual-copy" readOnly rows={8} value={manualText} onFocus={(e) => e.target.select()} />
          )}
          <p className="muted small">{t.checkoutNote}</p>
        </>
      )}
    </Sheet>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 8h14l-1.2 12H6.2L5 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
