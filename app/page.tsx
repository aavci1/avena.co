"use client";

import { useEffect, useRef, useState } from "react";
import { originalMarkup } from "./originalMarkup";
import { originalMarkup as originalMobileMarkup } from "./originalMobileMarkup";
import { originalMarkup as originalMenuMarkup } from "./originalMenuMarkup";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];
    const listen = (element: Element | null, event: string, handler: EventListener) => {
      if (!element) return;
      element.addEventListener(event, handler);
      cleanups.push(() => element.removeEventListener(event, handler));
    };
    const scrollTo = (selector: string) => root.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });

    root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      listen(anchor, "click", ((event: MouseEvent) => {
        const target = anchor.getAttribute("href");
        if (!target || target === "#") return;
        const section = root.querySelector(target);
        if (!section) return;
        event.preventDefault();
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }) as EventListener);
    });

    root.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
      listen(button, "click", (() => {
        const label = button.textContent?.trim() ?? "";
        if (label === "Contact Us") scrollTo("#contact-us");
        if (label.includes("TalentHub")) window.open("https://talenthub.avena.co/", "_blank", "noopener,noreferrer");
        if (label.toLowerCase().includes("intime")) window.open("https://intimeapp.io/", "_blank", "noopener,noreferrer");
        if (label === "Learn more") scrollTo("#about-us");
        if (label === "Learn More") scrollTo("#methodology");
        if (label === "Visit site →") {
          const item = button.closest('[class*="landing_item"]');
          if (item?.querySelector('img[alt="talenthub_logo"]')) window.open("https://talenthub.avena.co/", "_blank", "noopener,noreferrer");
          if (item?.querySelector('img[alt="intime_logo"]')) window.open("https://intimeapp.io/", "_blank", "noopener,noreferrer");
        }
      }) as EventListener);
    });

    const getInTouch = root.querySelector('[class*="landing_get_in_touch_with_us"]');
    listen(getInTouch, "click", (() => scrollTo("#contact-us")) as EventListener);

    root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("#contact-us input, #contact-us textarea").forEach((field) => {
      const expand = () => { field.style.height = "24px"; };
      const collapse = () => {
        if (!field.value.trim()) field.style.height = "0px";
      };
      listen(field, "focus", expand as EventListener);
      listen(field, "blur", collapse as EventListener);
    });

    const sendButton = root.querySelector<HTMLButtonElement>('#contact-us button');
    listen(sendButton, "click", ((event: MouseEvent) => {
      event.preventDefault();
      const required = [...root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("#contact-us [required]")];
      const invalid = required.find((field) => !field.value.trim() || (field.type === "email" && !field.checkValidity()));
      if (invalid) {
        invalid.focus();
        invalid.reportValidity();
        return;
      }
      let note = root.querySelector<HTMLElement>("[data-static-contact-note]");
      if (!note) {
        note = document.createElement("p");
        note.dataset.staticContactNote = "true";
        note.className = "static-contact-note";
        sendButton?.parentElement?.appendChild(note);
      }
      note.textContent = "Thank you. Your message is ready for our team.";
      required.forEach((field) => {
        field.value = "";
        field.style.height = "0px";
      });
    }) as EventListener);

    const menuTrigger = root.querySelector('[aria-label="menu"]');
    const menuHost = root.querySelector<HTMLElement>('[class*="header_hamburgerMenu"]');
    if (menuTrigger && menuHost) {
      menuTrigger.setAttribute("role", "button");
      menuTrigger.setAttribute("tabindex", "0");
      menuTrigger.setAttribute("aria-expanded", "false");
      let open = false;
      const close = () => {
        open = false;
        menuHost.innerHTML = "";
        menuHost.removeAttribute("style");
        menuTrigger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      };
      const show = () => {
        const template = document.createElement("template");
        template.innerHTML = originalMenuMarkup;
        const captured = template.content.firstElementChild as HTMLElement | null;
        if (!captured) return;
        open = true;
        menuHost.innerHTML = captured.innerHTML;
        menuHost.setAttribute("style", captured.getAttribute("style") ?? "width:100%;gap:0px");
        menuTrigger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
        menuHost.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", (event) => {
            event.preventDefault();
            const target = anchor.getAttribute("href");
            close();
            if (target) scrollTo(target);
          }, { once: true });
        });
        menuHost.querySelector('svg[width="16"][height="16"]')?.addEventListener("click", close, { once: true });
        menuHost.querySelector('svg[width="104"]')?.addEventListener("click", () => { close(); scrollTo("#top"); }, { once: true });
      };
      const toggle = () => open ? close() : show();
      listen(menuTrigger, "click", toggle as EventListener);
      listen(menuTrigger, "keydown", ((event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggle(); }
      }) as EventListener);
      cleanups.push(close);
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [isMobile]);

  return <div key={isMobile ? "mobile" : "desktop"} ref={rootRef} dangerouslySetInnerHTML={{ __html: isMobile ? originalMobileMarkup : originalMarkup }} />;
}
