import NavCalendar from "../components/nav_calendar";
import SidebarNavCalendar from "../components/sidebar_nav_calendar";

export default function CalendarLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <main className="flex h-screen">
            <aside className="w-64 border-r-2 border-solid border-grey-700 p-4">
                <SidebarNavCalendar />
            </aside>
            <section className="flex-1">
                <NavCalendar />
                <div className="p-4">
                    {children}
                </div>
            </section>
        </main>
    )
}