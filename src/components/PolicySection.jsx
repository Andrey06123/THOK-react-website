import { useState, useRef } from "react";

export default function PolicySection({ Point, Content }) {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="policy-section">
      <button
        className="policy-trigger"
        onClick={() => setActive(prev => !prev)}
      >
        {Point}
      </button>

      <div
        className="policy-content"
        style={{
          maxHeight: active
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
        }}
      >
        <div
          ref={contentRef}
          className="policy-content-inner"
          dangerouslySetInnerHTML={{ __html: Content }}
        />
      </div>
    </div>
  );
}