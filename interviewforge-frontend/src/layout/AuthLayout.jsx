function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950">

            <div className="grid lg:grid-cols-2 min-h-screen">

                {/* Left */}

                <div className="hidden lg:flex flex-col justify-center px-24">

                    <h1 className="text-6xl font-black text-white">
                        InterviewForge
                    </h1>

                    <p className="mt-6 text-xl text-slate-400 leading-9">

                        Master technical interviews with AI.

                        Practice realistic interviews.

                        Receive detailed feedback.

                        Track your improvement.

                    </p>

                </div>

                {/* Right */}

                <div className="flex items-center justify-center p-10">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default AuthLayout;