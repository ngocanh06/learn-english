import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Uncaught Error:", error, errorInfo);
  }

  handleReset = () => {
    // Chỉ tải lại trang, tuyệt đối KHÔNG xóa localStorage của người dùng
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <i className="fa-solid fa-triangle-exclamation text-rose-500 text-6xl mb-4" />
          <h1 className="text-2xl font-black mb-2">Ứng dụng vừa gặp sự cố nhỏ</h1>
          <p className="text-slate-400 text-sm max-w-lg mb-6 bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-left overflow-x-auto">
            {this.state.error?.toString()}
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition shadow-lg flex items-center gap-2"
          >
            <i className="fa-solid fa-rotate-right" /> Khôi phục ứng dụng & Tải lại trang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
