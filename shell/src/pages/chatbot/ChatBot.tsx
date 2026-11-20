import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch } from "@/hooks/use-redux";
import { cn } from "@/lib/utils";
import { _GetChat, _PostChat } from "@/redux/actions/chat";
import { ArrowDown, SendHorizontal } from "lucide-react";
import { Fragment, ReactNode, UIEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type ChatMessage = {
    id: string;
    role: 'user' | 'bot';
    text: string;
    createdAt: string; // ISO string
}

const pickText = (item: any): string => {
    if (typeof item === 'string') return item;
    const source = item?.data ?? item;
    if (typeof source === 'string') return source;
    return String(source?.reply ?? source?.response ?? source?.answer ?? source?.message ?? source?.content ?? '');
}

const toISO = (value: any): string => {
    const d = value ? new Date(value) : new Date();
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

const toHistory = (payload: any): ChatMessage[] => {
    const list = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
    return list
        .map((item: any, i: number): ChatMessage => ({
            id: String(item?.id ?? `h-${i}`),
            role: item?.role === 'user' || item?.sender === 'user' ? 'user' : 'bot',
            text: pickText(item),
            createdAt: toISO(item?.createdAt ?? item?.created_at),
        }))
        .filter((m: ChatMessage) => m.text);
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const formatDayLabel = (iso: string): string => {
    const date = new Date(iso);
    const diffDays = Math.round((startOfDay(date) - startOfDay(new Date())) / 86400000);
    if (diffDays === 0) return 'Today';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays === 1) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const formatTime = (iso: string): string =>
    new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

const isSameDay = (a: string, b: string) => startOfDay(new Date(a)) === startOfDay(new Date(b));

const ChatBot = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [sending, setSending] = useState(false);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputref = useRef<HTMLTextAreaElement>(null)

    const rafRef = useRef<number | null>(null);

    const groupedMessages = useMemo(() => {
        const groups: { dateKey: string; label: string; items: ChatMessage[] }[] = [];

        messages.forEach((m) => {
            const lastGroup = groups[groups.length - 1];
            if (!lastGroup || !isSameDay(lastGroup.items[0].createdAt, m.createdAt)) {
                groups.push({
                    dateKey: m.id,
                    label: formatDayLabel(m.createdAt),
                    items: [m],
                });
            } else {
                lastGroup.items.push(m);
            }
        });

        return groups;
    }, [messages]);

    console.log(groupedMessages)

    const cancelScrollAnimation = () => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        const el = scrollRef.current;
        if (!el) return;
        cancelScrollAnimation();

        const start = el.scrollTop;
        const distance = el.scrollHeight - el.clientHeight - start;
        if (behavior === 'auto' || Math.abs(distance) < 2) {
            el.scrollTop = el.scrollHeight;
            return;
        }

        const duration = Math.min(700, Math.max(350, Math.abs(distance) * 0.6));
        const startTime = performance.now();
        const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

        const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const target = el.scrollHeight - el.clientHeight;
            el.scrollTop = start + (target - start) * ease(progress);
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                rafRef.current = null;
            }
        };
        rafRef.current = requestAnimationFrame(step);
    }

    useEffect(() => cancelScrollAnimation, []);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        setShowScrollBtn(distanceFromBottom > 24);
    }

    useEffect(() => {
        if (!open) return;
        let cancelled = false;
        const load = async () => {
            setLoadingHistory(true);
            const { payload } = await dispatch(_GetChat({ navigate }));
            if (!cancelled) {
                setMessages(toHistory(payload));
                setLoadingHistory(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [open]);

    useEffect(() => {
        if (loadingHistory) return;
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, [messages, sending, loadingHistory]);

    useEffect(() => {
        if (!open) return;

        // requestAnimationFrame ensures the dialog DOM has mounted and painted
        const frame = requestAnimationFrame(() => {
            inputref.current?.focus()
        });

        return () => cancelAnimationFrame(frame);
    }, [open]);

    const sendMessage = async (e?: any) => {
        e?.preventDefault();
        const text = message.trim();
        if (!text || sending) return;

        setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text, createdAt: new Date().toISOString() }]);
        setMessage('');
        setSending(true);

        const { payload } = await dispatch(_PostChat({ request: { message: text }, navigate }));
        const reply = pickText(payload);

        setMessages((prev) => [
            ...prev,
            {
                id: `b-${Date.now()}`,
                role: 'bot',
                text: reply || 'Sorry, I could not get a response. Please try again.',
                createdAt: toISO((payload as any)?.createdAt ?? (payload as any)?.data?.createdAt),
            },
        ]);
        setSending(false);
    }

    const canSend = !sending && !!message.trim();

    function inline(text: string): ReactNode[] {
        return text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g).map((part, i) => {
            if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
            if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) return <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{part.slice(1, -1)}</code>
            return <Fragment key={i}>{part}</Fragment>
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="flex min-w-2xl h-136 max-h-[85vh] flex-col gap-3">
                <DialogHeader className="font-semibold text-[#001b71]">Chat with EVA</DialogHeader>

                <div className="relative min-h-0 flex-1">
                    <div ref={scrollRef} onScroll={handleScroll} onWheel={cancelScrollAnimation} onTouchStart={cancelScrollAnimation} className="h-full space-y-3 overflow-y-auto rounded-xl border bg-muted/30 p-3 custom-scrollbar">
                        {loadingHistory ? (
                            <>
                                <Skeleton className="h-8 w-2/3 bg-gray-300" />
                                <Skeleton className="ml-auto h-8 w-1/2 bg-gray-300" />
                                <Skeleton className="h-8 w-3/4 bg-gray-300" />
                            </>
                        ) : messages.length === 0 ? (
                            <p className="mt-10 text-center text-sm text-muted-foreground">
                                Hi, I&apos;m EVA. Ask me anything to get started.
                            </p>
                        ) : (
                            groupedMessages.map((m) => (
                                <div key={m.dateKey} className="relative">
                                    {/* Sticky Date Header for this day's section */}
                                    <div className="sticky top-2 z-10 flex justify-center py-1 pointer-events-none">
                                        <span className="rounded-full bg-white/95 backdrop-blur-sm px-3 py-0.5 text-[11px] font-medium text-muted-foreground shadow-sm ring-1 ring-border">
                                            {m.label}
                                        </span>
                                    </div>

                                    {m.items.map((item) => (
                                        <div className={cn('flex', item.role === 'user' ? 'justify-end' : 'justify-start')}>
                                            <div
                                                className={cn(
                                                    'max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm mb-3',
                                                    item.role === 'user'
                                                        ? 'rounded-br-sm bg-[#001b71] text-white'
                                                        : 'rounded-bl-sm border bg-white text-foreground'
                                                )}
                                            >
                                                <p className="whitespace-pre-wrap wrap-break-word">{inline(item.text)}</p>
                                                <p
                                                    className={cn(
                                                        'mt-1 text-right text-[10px]',
                                                        item.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                                                    )}
                                                >
                                                    {formatTime(item.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        )}

                        {sending && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border bg-white px-3 py-3">
                                    <span className="size-1.5 animate-bounce rounded-full bg-[#001b71]/60 [animation-delay:-0.3s]" />
                                    <span className="size-1.5 animate-bounce rounded-full bg-[#001b71]/60 [animation-delay:-0.15s]" />
                                    <span className="size-1.5 animate-bounce rounded-full bg-[#001b71]/60" />
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        aria-label="Scroll to latest message"
                        aria-hidden={!showScrollBtn}
                        tabIndex={showScrollBtn ? 0 : -1}
                        onClick={() => scrollToBottom('smooth')}
                        className={cn(
                            'absolute bottom-3 right-4 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#001b71] shadow-lg ring-1 ring-border',
                            'transition-all duration-300 ease-out hover:bg-[#001b71] hover:text-white active:scale-90',
                            showScrollBtn
                                ? 'translate-y-0 scale-100 opacity-100 hover:-translate-y-0.5'
                                : 'pointer-events-none translate-y-3 scale-75 opacity-0'
                        )}
                    >
                        <ArrowDown className="size-4" />
                    </button>
                </div>

                <form onSubmit={sendMessage} className="flex items-center gap-2 rounded-md border bg-white p-2 shadow-sm transition focus-within:border-[#001b71]/50 focus-within:shadow-md focus-within:ring-4 focus-within:ring-[#001b71]/10">
                    <textarea id="chat-input"
                        value={message} ref={inputref}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask EVA anything..."
                        autoComplete="off"
                        disabled={sending}
                        className="min-w-0 flex-1 align-middle bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled={!canSend}
                        aria-label="Send message"
                        className={cn(
                            'flex size-9 shrink-0 items-center justify-center rounded-full text-white transition-all duration-200',
                            canSend
                                ? 'cursor-pointer bg-linear-to-br from-[#274bba] to-[#001b71] shadow-md hover:scale-105 hover:shadow-lg active:scale-95'
                                : 'cursor-not-allowed bg-gray-300'
                        )}
                    >
                        <SendHorizontal className="size-4" />
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ChatBot;
