import { books } from "../data/editorial";
import { Arrow } from "../components/Arrow";

export function Books() {
  return (
    <section
      className="books-section section-space page-width"
      id="published-books"
      tabIndex={-1}
      aria-labelledby="books-title"
    >
      <div className="section-heading">
        <p className="eyebrow">
          <span className="section-index">03</span> 著書
        </p>
        <span className="section-jp">これまでに刊行した5冊</span>
      </div>
      <div className="section-title-row">
        <h2 id="books-title">本で伝える、経験と考え。</h2>
        <div>
          <p>
            不動産投資から、大阪の未来まで。
            <br />
            経験と想いを綴った、5冊の著書。
          </p>
          <a
            href="https://linx-osaka.co.jp/books.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            すべての著書を見る
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <ol className="book-shelf">
        {books.map((book, index) => (
          <li key={book.image}>
            <a
              href="https://linx-osaka.co.jp/books.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="book-cover">
                <span className="mono">0{index + 1}</span>
                <img
                  src={book.image}
                  alt={book.title + "の表紙"}
                  loading="lazy"
                  width="200"
                  height="290"
                />
                <span className="book-arrow">
                  <Arrow diagonal />
                </span>
              </div>
              <p className="book-category mono">
                {index === 0 ? "街づくり" : "不動産投資"}
              </p>
              <h3>{book.title}</h3>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
