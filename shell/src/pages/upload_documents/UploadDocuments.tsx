import { Button } from "@/components/custom/button";
import Iconify from "@/components/custom/iconify";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/use-redux";
import { _postUploadDoc } from "@/redux/actions/uploadDocuments";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UploadDocuments = () => {
    const [docFile, setDocFile] = useState<File>(null);
    const [openFile, setOpenFile] = useState({ open: false, blob: '', fileName: '' });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null)

    const handleOnchange = (e: React.ChangeEvent<HTMLElement>) => {
        const { files }: any = e.target
        if (files) {
            setDocFile(files[0])
        }
    }

    const handleOpenFile = () => {
        if (docFile)
            setOpenFile({ open: true, blob: URL.createObjectURL(docFile), fileName: docFile.name })
    }

    console.log(docFile)

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', docFile);
        formData.append('fileName', docFile?.name);
        console.log(formData)
        const { payload }: any = await dispatch(_postUploadDoc({ navigate, data: formData }));
        if (payload?.data?.status && payload?.data?.data?.id) {
            toast('File Uploaded Succesfully')
        } else {
            toast.error(payload.data.message || 'Please Try Again')
        }
    }

    const handleDelete = () => {
        setDocFile(null)
    }

    return (
        <div className="p-2">
            {/* <div className="my-2 flex-col">
                <Label className="font-bold text-xl">
                    Upload Documents
                </Label>

                <div className="flex flex-col mb-2 items-start">
                    <input type="file" placeholder="Choose File" onChange={handleOnchange} accept="image/png, image/jpg, .pdf" className="cursor-pointer w-auto border p-2" />
                </div>
                </div> */}

            <div className="space-y-2 mb-2">
                <Label className="text-xl font-bold">Upload Documents</Label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={'image/png, image/jpg, .pdf'}
                    onChange={handleOnchange}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center cursor-pointer gap-2 rounded-(--radius-control) border border-dashed border-input px-3 py-3 text-left text-sm transition-colors hover:bg-muted/50"
                >
                    <Iconify icon="lucide:upload" className="h-4 w-4 text-muted-foreground" />
                    {docFile ? (
                        <span className="truncate font-medium">{docFile.name}</span>
                    ) : (
                        <span className="text-muted-foreground">Choose a file to upload…</span>
                    )}
                </button>
            </div>

            {docFile && <Label className="font-bold text-sm">
                Preview
            </Label>}

            {docFile && <Item variant="outline" className="mb-2">
                <ItemMedia variant="icon">
                    <Iconify icon="akar-icons:file" width={4} height={4} />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>{docFile?.name ?? ''}</ItemTitle>
                </ItemContent>
                <ItemActions>
                    <Button onClick={handleOpenFile}>View</Button>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>

                </ItemActions>
            </Item>}

            <Button onClick={handleUpload} disabled={!docFile}>
                <Iconify icon="akar-icons:cloud-upload" className="mr-2" />
                Upload Document</Button>

            <Dialog open={openFile.open} onOpenChange={() => setOpenFile({ open: false, blob: '', fileName: '' })}>
                <DialogContent className="min-w-4xl h-5/6">
                    <div className='mb-2 w-full grow flex flex-col overflow-hidden'>
                        <h2 className="text-sm mb-1 font-medium text-[#543586]">{openFile.fileName}</h2>
                        <div className="grow flex flex-col overflow-hidden">
                            <iframe src={openFile.blob} width="100%"
                                height="100%"
                                title={openFile.fileName}
                                className="w-full h-full" />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UploadDocuments