import CmsNav from "@/components/cms/CmsNav";
import AdminInviteForm from "@/components/cms/AdminInviteForm";

export default function CmsAdminsPage() {
    return (
        <>
            <CmsNav active="admins" />

            <h1 className="mb-8 text-2xl font-medium text-white">Admins</h1>

            <AdminInviteForm />
        </>
    );
}