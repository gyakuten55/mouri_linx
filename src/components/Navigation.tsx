import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Arrow";

const links = [
  { id: "youtube-latest", label: "発信", japanese: "発信・動画" },
  { id: "authority", label: "プロフィール", japanese: "毛利英昭について" },
  { id: "published-books", label: "著書", japanese: "著書" },
  { id: "business", label: "事業", japanese: "経営する事業" },
];

export function Navigation() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    for (const id of ["top", ...links.map((link) => link.id), "contact"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector("main");
    const previousInert = main?.inert ?? false;
    if (main) main.inert = true;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const anchors = Array.from(
          menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
        );
        const first = anchors[0];
        const last = anchors.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          menuButton.current?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menuButton.current?.focus();
        } else if (document.activeElement === menuButton.current) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        }
      }
    };
    const wideScreen = window.matchMedia("(min-width: 961px)");
    const onResize = () => {
      if (wideScreen.matches) {
        if (menu.current?.contains(document.activeElement)) {
          document
            .querySelector<HTMLAnchorElement>(".personal-wordmark")
            ?.focus();
        }
        setOpen(false);
      }
    };
    wideScreen.addEventListener("change", onResize);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = previousInert;
      document.removeEventListener("keydown", closeOnEscape);
      wideScreen.removeEventListener("change", onResize);
    };
  }, [open]);

  function closeMenu(id: string) {
    setOpen(false);
    const main = document.querySelector("main");
    if (main) main.inert = false;
    document.getElementById(id)?.focus({ preventScroll: true });
  }

  return (
    <header className="site-header">
      <a
        className="personal-wordmark"
        href="#top"
        aria-label="毛利英昭 トップへ"
        onClick={() => setOpen(false)}
      >
        <span>毛利 英昭</span>
        <small>HIDEAKI MOURI</small>
      </a>
      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-current={active === link.id ? "location" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="#contact">
        ご相談・お問い合わせ
        <Arrow diagonal />
      </a>
      <button
        className={`menu-toggle ${open ? "is-open" : ""}`}
        ref={menuButton}
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <div className="mobile-menu" id="mobile-menu" ref={menu} hidden={!open}>
        <nav aria-label="モバイルナビゲーション">
          {links.map((link, index) => (
            <a
              href={`#${link.id}`}
              key={link.id}
              onClick={() => closeMenu(link.id)}
            >
              <span className="mono">0{index + 1}</span>
              <span>
                {link.label}
                <small>{link.japanese}</small>
              </span>
              <Arrow />
            </a>
          ))}
          <a href="#contact" onClick={() => closeMenu("contact")}>
            <span className="mono">05</span>
            <span>
              お問い合わせ<small>ご相談・取材のご依頼</small>
            </span>
            <Arrow />
          </a>
        </nav>
        <p className="mono">株式会社リンクス / 株式会社Meta Osaka</p>
      </div>
    </header>
  );
}
