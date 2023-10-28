import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import toast from "react-hot-toast";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
type setOpenWindow = (open: boolean) => void;
export default function CreateEventModel({
  openWindow,
  setOpenWindow,
}: {
  openWindow: boolean;
  setOpenWindow: setOpenWindow;
}) {
  const {data:sessionData}=useSession();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [length, setLength] = React.useState("");
  // const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };
  const { mutate, isLoading } = trpc.eventType.create.useMutation();
  const handleClose = () => {
    // setOpen(false);
    setOpenWindow(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (openWindow) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openWindow]);

  return (
    <div className=" ">
      <Dialog
        className="overflow-x-hidden"
        open={openWindow}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div className="  overflow-x-hidden text-black">
          {/* <DialogTitle id="scroll-dialog-title">
            Create a new Event Type
          </DialogTitle> */}
          <DialogContent className="w-[700px] py-6">
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div className="  text-xl text-black">
                <h1 className="py-2 text-2xl font-bold">
                  Add a new event type
                </h1>
                <p className="pb-1" style={{ color: "#6b7280" }}>
                  Create a new event type for people to book times with.
                </p>
                <h1>Title</h1>
                <input
                  className="h-10 w-3/4  rounded border border-slate-600 px-2 py-4  text-sm tracking-normal"
                  type="text"
                  placeholder="Quick meet"
                  //@ts-expect-error ttodo
                  onChange={(e: Event) => {
                    if (e.target instanceof HTMLInputElement) {
                      setTitle(e.target.value.toString());
                    } else {
                      setTitle("");
                    }
                  }}
                />
                <h1>Description</h1>
                <input
                  className="srounded h-14  w-3/4 border border-slate-600 px-2   py-4 text-sm"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <h1>Length (mins)</h1>
                <div className="flex">
                  <input
                    className="w-3/5 border border-slate-600 px-3"
                    type="number"
                    onChange={(e) => setLength(e.target.value.toString())}
                  />
                  <div className="rounded-r bg-[#374151]  px-1 py-1 font-thin text-white">
                    Minutes
                  </div>
                </div>
                <div className=" mr-20  flex  gap-3 pt-4 sm:justify-end">
                  <Button
                  variant={"outline"}
                    className="cursor-pointer rounded  px-2 py-1 text-white"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <Button
                    className=" text-white"
                    variant={"outline"}
                    onClick={() => {
                      if (title == "") {
                        toast.error("Please enter title");
                        return;
                      }

                      if (length == "") {
                        toast.error("Please enter length");
                        return;
                      }
                      mutate({
                        title,
                        description,
                        userId: "clmq8xng60000uvd08fuz8uq1",
                        length,
                        hidden: false,
                      });
                      {
                        !isLoading && handleClose();
                      }
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions></DialogActions> */}
        </div>
      </Dialog>
    </div>
  );
}
