import { useRef } from "react";
import { Stage, Layer, Text, Image as KonvaImage } from "react-konva";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
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
      <div className="mt-2">
        <Slider
          defaultValue={[1]}
          min={0.1}
          max={2}
          step={0.1}
          onValueChange={(v) => setScale(v[0])}
        />
      </div>
    </>
  );
}

function MiniStickerApp() {
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
    <div className="p-4 max-w-md mx-auto">
      <Card className="p-4 space-y-4">
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="พิมพ์ข้อความในสติ๊กเกอร์"
        />
        <div className="border border-gray-300">
          <Stage width={370} height={320} ref={stageRef} className="bg-white">
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
        <Button onClick={downloadImage}>ดาวน์โหลดสติ๊กเกอร์</Button>
      </Card>
    </div>
  );
}

export default MiniStickerApp;
