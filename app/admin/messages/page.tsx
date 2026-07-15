import { db } from "@/lib/db";
import { MessageStatusSelect } from "@/components/admin/message-status-select";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteMessage } from "@/lib/actions/admin/messages.actions";
import { formatDate } from "@/lib/utils";

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Mesajlar</h1>

      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="rounded-2xl border border-border p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {message.subject} <span className="font-normal text-muted-foreground">— {message.name}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {message.email} {message.phone ? `· ${message.phone}` : ""}
                </p>
                <p className="mt-2 text-sm">{message.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatDate(message.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <MessageStatusSelect messageId={message.id} status={message.status} />
                <DeleteButton action={deleteMessage.bind(null, message.id)} />
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-sm text-muted-foreground">Hələ mesaj yoxdur.</p>}
      </div>
    </div>
  );
}
