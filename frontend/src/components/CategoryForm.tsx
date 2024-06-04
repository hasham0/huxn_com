import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
} from "react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  buttonText?: "Submit" | "Update";
  handleDelete?: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};
export default function CategoryForm({
  value,
  setValue,
  handleDelete,
  handleSubmit,
  buttonText,
}: Props) {
  const handleDeleteClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (handleDelete) {
      // Find the form element and call the delete handler
      const form = event.currentTarget.closest("form");
      if (form) {
        await handleDelete(event as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };
  return (
    <div>
      <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            className="py-3 px-4 border rounded-lg w-full"
            placeholder="Write category name"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
          />

          <div className="flex justify-between">
            <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
              {buttonText}
            </button>
            {handleDelete && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
