function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-[10%] left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-gray-900 text-white px-5 py-3 rounded-lg font-bold text-sm shadow-lg uppercase tracking-wide">
        {message}
      </div>
    </div>
  );
}

export default Toast;
