const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-lg font-bold">My Application</h1>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-4">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>&copy; 2024 My Application. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
