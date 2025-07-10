import { useRef, useState } from "react";
import { Stage, Layer, Text, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

function DraggableImage({ src }) {
  const [image] = useImage(src);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);

  return (
    <>
      <KonvaImage
        image={image}
        x={position.x}
        y={position.y}
        draggable
        scale={{ x: scale, y: scale }}
        onDragEnd={(e) => {
          setPosition({ x: e.target.x(), y: e.target.y() });
        }}
      />
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.1"
        defaultValue="1"
        onChange={(e) => setScale(parseFloat(e.target.value))}
        style={{ width: "100%" }}
      />
    </>
  );
}

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [text, setText] = useState("สวัสดีค่ะ");
  const stageRef = useRef();

  const downloadImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "sticker.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (evt) {
      setImageSrc(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Mini Canva Sticker</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="พิมพ์ข้อความในสติ๊กเกอร์"
        style={{ width: "100%", marginTop: 10 }}
      />
      <div style={{ border: "1px solid #ccc", marginTop: 10 }}>
        <Stage width={370} height={320} ref={stageRef}>
          <Layer>
            {imageSrc && <DraggableImage src={imageSrc} />}
            <Text
              text={text}
              fontSize={24}
              fill="black"
              x={10}
              y={280}
              draggable
            />
          </Layer>
        </Stage>
      </div>
      <button onClick={downloadImage} style={{ marginTop: 10 }}>
        ดาวน์โหลดสติ๊กเกอร์
      </button>
    </div>
  );
}

export default App;