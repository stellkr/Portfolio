import React, { Component } from 'react';
import './ErrorBoundary.css';

/**
 * 에러 바운더리 컴포넌트
 * 자식 컴포넌트에서 발생하는 에러를 캐치하여 폴백 UI를 표시합니다.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트합니다.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 정보를 상태에 저장합니다.
    this.setState({ errorInfo });
    
    // 에러 로깅 또는 에러 리포팅 서비스에 에러를 보낼 수 있습니다.
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 렌더링합니다.
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>문제가 발생했습니다</h2>
            <p>죄송합니다. 페이지를 표시하는 중에 오류가 발생했습니다.</p>
            <div className="error-actions">
              <button 
                onClick={() => window.location.reload()}
                className="reload-button"
              >
                페이지 새로고침
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="home-button"
              >
                홈으로 돌아가기
              </button>
            </div>
            {this.props.showDetails && (
              <details className="error-details">
                <summary>오류 상세 정보</summary>
                <p>{this.state.error && this.state.error.toString()}</p>
                <div className="stack-trace">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    // 에러가 없으면 자식 컴포넌트를 정상적으로 렌더링합니다.
    return this.props.children;
  }
}

export default ErrorBoundary;