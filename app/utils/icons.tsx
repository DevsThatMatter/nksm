import {
  AvatarIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Cross1Icon,
  Cross2Icon,
  CrossCircledIcon,
  ImageIcon,
  Link2Icon,
  MagnifyingGlassIcon,
  MoonIcon,
  PaperPlaneIcon,
  PlusIcon,
  ReloadIcon,
  StarFilledIcon,
  StarIcon,
  SunIcon,
  TrashIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons";

export const Icons = {
  sun: SunIcon,
  moon: MoonIcon,
  avatar: AvatarIcon,
  saved: BookmarkIcon,
  chaticon: ChatBubbleIcon,
  cross: Cross2Icon,
  add: PlusIcon,
  replyIcon: ChevronDownIcon,
  search: MagnifyingGlassIcon,
  moveback: ChevronLeftIcon,
  sendIcon: PaperPlaneIcon,
  fileLink: Link2Icon,
  image: ImageIcon,
  remove: CrossCircledIcon,
  yes: CheckIcon,
  no: Cross1Icon,
  new: StarFilledIcon,
  likeNew: StarIcon,
  used: UpdateIcon,
  buffering: UpdateIcon,
  loading: ReloadIcon,
  upload: UploadIcon,
  serverCrash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-server-crash"
    >
      <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
      <path d="M6 6h.01" />
      <path d="M6 18h.01" />
      <path d="m13 6-4 6h6l-4 6" />
    </svg>
  ),
  delete: TrashIcon,
};
