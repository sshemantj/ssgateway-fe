import { FileUploader } from "react-drag-drop-files";

interface IProps {
  children: JSX.Element;
  handleChange: (file: any) => void;
}

const DragDrop = (props: IProps) => {
  const { handleChange, children } = props;

  return (
    <FileUploader handleChange={handleChange} name="file">
      {children}
    </FileUploader>
  );
};

export default DragDrop;
