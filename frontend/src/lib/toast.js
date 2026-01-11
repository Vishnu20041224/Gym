import { toast } from "sonner"

export function warningToast(title, msg) {
    return toast.warning(title, {
        description: msg,
        style: {
            background: "#f59e0b",        // Amber-500 (warning)
            color: "#ffffff",             // White text
            border: "1px solid #d97706",  // Amber-600
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            borderRadius: "12px",
        },
        classNames: {
            title: "text-lg font-bold",       // ⬅️ Increase title size
            description: "text-sm opacity-90",
            actionButton: "text-sm font-medium",
        },
        action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
        },
    })
}


export function successfullyToast(title, msg) {
    return toast.success(title, {
        description: msg,
        style: {
            background: "#22c55e",        // Green-500
            color: "#ffffff",
            border: "1px solid #16a34a",  // Green-600
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            borderRadius: "12px",
        },

        // ✅ Text styles
        classNames: {
            title: "text-lg font-bold",
            description: "text-sm opacity-90",
            actionButton: "text-sm font-medium bg-white/20 hover:bg-white/30",
        },
        action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
        },
    })
}
