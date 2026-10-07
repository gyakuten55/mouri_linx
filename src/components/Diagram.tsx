import { useRef, useState } from "react";

type DiagramProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  className: string;
};

export function Diagram({
  src,
  alt,
  width,
  height,
  caption,
  className,
}: DiagramProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  function openDiagram() {
    setZoomed(false);
    dialog.current?.showModal();
  }
  return (
    <figure className={className}>
      <button
        type="button"
        className="diagram-preview"
        onClick={openDiagram}
        aria-label={`${caption}：図を拡大`}
      >
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </button>
      <figcaption>
        <span>{caption}</span>
        <button type="button" className="diagram-expand" onClick={openDiagram}>
          図を拡大 <span aria-hidden="true">＋</span>
        </button>
      </figcaption>
      <dialog
        className="diagram-dialog"
        ref={dialog}
        aria-label={caption}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="diagram-dialog-heading">
          <p>{caption}</p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="図を閉じる"
            autoFocus
          >
            閉じる <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="diagram-toolbar">
          <p>
            {zoomed
              ? "図をスクロールしてご覧いただけます。"
              : "図全体を表示しています。"}
          </p>
          <button
            type="button"
            aria-pressed={zoomed}
            onClick={() => setZoomed(!zoomed)}
          >
            {zoomed ? "全体を表示" : "拡大する"}
          </button>
        </div>
        <div
          className={`diagram-zoom${zoomed ? " is-zoomed" : ""}`}
          tabIndex={zoomed ? 0 : undefined}
          role="region"
          aria-label="図の表示領域"
        >
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
          />
        </div>
      </dialog>
    </figure>
  );
}
