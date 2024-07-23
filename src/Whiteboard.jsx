import React, { useEffect } from "react";
// import Tldraw from "tldraw"
import { Tldraw, useEditor } from "tldraw";

function Whiteboard() {
  useEffect(() => {
    console.log("hi");
  });

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <div style={{ position: "fixed", inset: 0 }}>
          <Tldraw>
            <GetEditor />
          </Tldraw>
        </div>
      </div>
    </>
  );
}

// It is mentioned in them liabrary that you need to create a seperate function to utilise the useEditor() hook of tldraw,

function GetEditor() {
  const editor = useEditor();

  const handleSubmit = async () => {
    const result = Array.from(editor.getCurrentPageShapeIds());
    const getSVG = await editor.getSvgString(result);
    console.log(getSVG);

    //1 this will create a SVG string through which we can make a canvas and create a image object.
    //2 After creating image object, we need to create a blob, to get object link, to give source to the dynamically create image,
    // 3 After getting image, we give a onLoad event to image, and make a canvas, of same size of image's Height & width, because we want a clean image, canvas usse bada ya chota hua to white space dikhega,
    // fir 2d contect ke canvas pr image ko draw kr denge,
    //  fir canvas se objectUrl le lenge png format me.

    makeImage(getSVG.svg, getSVG.height, getSVG.width);
  };

  function makeImage(svg, height, width) {
    const img = new Image();
    const imgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(imgBlob);
    img.src = url;
      console.log(img);

    img.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      canvas.height = height;
      canvas.width = width;
        const context = canvas.getContext("2d");
        
        // in this step we are making a 2d context of canvas, and drawing a image to that canvas's context, we will start drawing image at 0,0 means zero height zero width of context, and make it to complete height and complete width of canvas,
        // qki humne canvas exactly image ke size ka hi banaya hai.

        context.drawImage(img, 0, 0, width, height);

        const pngUrl = canvas.toDataURL("image/png");
        console.log(pngUrl);

        
    });
  }

  return (
    <button className="btn" onClick={handleSubmit}>
      Get ID
    </button>
  );
}

export default Whiteboard;
