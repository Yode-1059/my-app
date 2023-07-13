import { PhotoIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useRef,
  useState,
} from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import { Dialog, Transition } from "@headlessui/react";
import { UseControllerProps, useController } from "react-hook-form";

const ImageSelector = <T,>({ control, name }: UseControllerProps<T>) => {
  const [selectedImg, setSelectedImg] = useState<File | null>();
  const [scale, setScale] = useState<number>(1.2);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const ref = useRef<AvatarEditor>(null);

  const { field }: any = useController({ control, name });

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setSelectedImg(acceptedFiles[0]);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getClopedImg = () => {
    const img = ref.current.getImage();
    const canvas = document.createElement("canvas");
    canvas.width = 80;
    canvas.height = 80;

    const cts = canvas.getContext("2d");
    cts?.drawImage(img!, 0, 0, 80, 80);

    // setPreview(canvas.toDataURL("image/png"));
    field.onChange(canvas.toDataURL("image/png"));
    closeModal();
  };
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDropAccepted,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
  });
  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };
  return (
    <div>
      <div
        className={classNames(
          "aspect-square w-40 relative rounded-full overflow-hidden grid content-center hover:cursor-pointer hover:bg-blue-100 border-slate-800 border-2 border-dashed",
          isDragAccept && "bg-red-100"
        )}
        {...getRootProps()}
      >
        {field.value && (
          <img
            src={field.value as string}
            className="w-full top-o left-0 h-full block absolute"
          />
        )}
        <div className="text-center z-5 relative h-10">
          <p className=" text-slate-400 text-sm">画像を選択</p>
          <PhotoIcon className="mx-auto w-10 h-10 text-slate-400" />
        </div>
      </div>
      {field.value && (
        <button
          className=" text-slate-600 text-sm mt-2 block"
          onClick={() => field.onChange("")}
        >
          画像を消す
        </button>
      )}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {selectedImg && (
                    <div>
                      <AvatarEditor
                        ref={ref}
                        image={selectedImg}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={125}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                        rotate={0}
                      />
                      <input
                        type="range"
                        onChange={handleScaleChange}
                        defaultValue={1.5}
                        min={1}
                        max={2}
                        step={0.1}
                      />
                    </div>
                  )}
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="px-3 py-2 rounded-full bg-slate-200"
                      onClick={closeModal}
                    >
                      閉じる
                    </button>
                    <button
                      onClick={getClopedImg}
                      className="px-3 py-2 rounded-full bg-blue-600 text-white"
                    >
                      保存
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <input {...getInputProps()} />
    </div>
  );
};

export default ImageSelector;
