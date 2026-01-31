export default function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div
                    className="w-16 h-16 mx-auto rounded-full border-4 mb-4 animate-spin"
                    style={{
                        borderColor: '#FFD6EC',
                        borderTopColor: '#FF6CA4'
                    }}
                />
                <p
                    className="text-sm"
                    style={{ color: 'rgba(18, 18, 18, 0.5)', fontFamily: 'monospace' }}
                >
                    loading aki&apos;s world...
                </p>
            </div>
        </div>
    );
}
