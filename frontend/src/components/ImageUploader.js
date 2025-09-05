import { Thumbnail } from "../styles/styles";

function ImageUploader({ num, modelo, setModelo }) {
  const img = modelo[`imagem${num}`];

  return (
    <label>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) =>
          setModelo({ ...modelo, [`imagem${num}`]: e.target.files[0] })
        }
      />
      <Thumbnail>
        {img ? (
          <img
            src={
              img instanceof File
                ? URL.createObjectURL(img)
                : `http://localhost:8800${img}`
            }
            alt={`Imagem ${num}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          "+"
        )}
      </Thumbnail>
    </label>
  );
}

export default ImageUploader;
