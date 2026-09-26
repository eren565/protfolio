import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfError, setPdfError] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(0);
  const [baseScale, setBaseScale] = useState(1.0);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const pdfUrl = "/resume.pdf";
  const resumeImageUrl = "/resume.jpg";

  // Calculate optimal base scale for PDF to fit nicely
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        // Calculate base scale to fit PDF nicely (assuming A4 width ~595pt)
        // We want PDF to take ~85% of container width for better appearance
        const optimalScale = (width * 0.85) / 595;
        setBaseScale(optimalScale);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setPdfError(false);
  }

  function onDocumentLoadError(error) {
    console.error("PDF failed to load, showing image instead:", error);
    setPdfError(true);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
    resetPosition();
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
    resetPosition();
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.25, 0.5);
      if (newScale === 1.0) {
        resetPosition();
      }
      return newScale;
    });
  };

  const resetZoom = () => {
    setScale(1.0);
    resetPosition();
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  const goBack = () => {
    navigate(-1);
  };

  // Enhanced mouse wheel zoom with cursor-centered zooming
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      const delta = -e.deltaY;
      const zoomSpeed = 0.15;
      const newScale = delta > 0 
        ? Math.min(scale + zoomSpeed, 3.0)
        : Math.max(scale - zoomSpeed, 0.5);

      if (newScale !== scale) {
        const scaleChange = newScale / scale;
        const newX = position.x - mouseX * (scaleChange - 1);
        const newY = position.y - mouseY * (scaleChange - 1);

        setScale(newScale);
        
        if (newScale === 1.0) {
          resetPosition();
        } else {
          setPosition({ x: newX, y: newY });
        }
      }
    }
  };

  // Touch support for mobile pinch zoom
  const touchStartRef = useRef({ distance: 0, midpoint: { x: 0, y: 0 } });

  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchMidpoint = (touches) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      const midpoint = getTouchMidpoint(e.touches);
      touchStartRef.current = { distance, midpoint };
    } else if (e.touches.length === 1 && scale > 1.0) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      const midpoint = getTouchMidpoint(e.touches);
      
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mouseX = midpoint.x - rect.left - rect.width / 2;
      const mouseY = midpoint.y - rect.top - rect.height / 2;

      const scaleChange = distance / touchStartRef.current.distance;
      const newScale = Math.min(Math.max(scale * scaleChange, 0.5), 3.0);

      if (newScale !== scale) {
        const actualScaleChange = newScale / scale;
        const newX = position.x - mouseX * (actualScaleChange - 1);
        const newY = position.y - mouseY * (actualScaleChange - 1);

        setScale(newScale);
        if (newScale === 1.0) {
          resetPosition();
        } else {
          setPosition({ x: newX, y: newY });
        }
      }

      touchStartRef.current = { distance, midpoint };
    } else if (e.touches.length === 1 && isDragging && scale > 1.0) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse drag to pan
  const handleMouseDown = (e) => {
    if (scale > 1.0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1.0) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [scale, position]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, scale]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center py-3 sm:py-4 md:py-6">
      {/* Header */}
      <div className="w-full max-w-[98%] sm:max-w-[95%] lg:max-w-6xl xl:max-w-7xl mb-3 sm:mb-4 px-2 sm:px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 bg-slate-700/90 hover:bg-slate-600 backdrop-blur-sm text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm border border-slate-600/50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white text-center flex-1">
            My <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">Resume</span>
          </h1>
          <div className="w-14 sm:w-20"></div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-[98%] sm:max-w-[95%] lg:max-w-6xl xl:max-w-7xl bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-3 sm:p-4 mb-3 sm:mb-4 border border-slate-700/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-slate-600/50"
              title="Zoom Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <div className="bg-slate-700/50 px-4 py-2 rounded-lg min-w-[70px] text-center">
              <span className="text-white font-bold text-sm">{Math.round(scale * 100)}%</span>
            </div>
            <button
              onClick={zoomIn}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-slate-600/50"
              title="Zoom In"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
            <button
              onClick={resetZoom}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm"
              title="Reset Zoom"
            >
              Reset
            </button>
          </div>

          {/* Page Controls & Download */}
          <div className="flex items-center gap-3">
            {!pdfError && numPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 text-white px-3 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm border border-slate-600/50"
                >
                  ← Prev
                </button>
                <span className="text-white font-semibold text-xs sm:text-sm bg-slate-700/50 px-3 py-2 rounded-lg min-w-[100px] text-center">
                  Page {pageNumber} / {numPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 text-white px-3 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm border border-slate-600/50"
                >
                  Next →
                </button>
              </div>
            )}

            {!pdfError && numPages === 1 && (
              <div className="text-slate-400 text-xs sm:text-sm font-semibold bg-slate-700/30 px-3 py-2 rounded-lg">
                Single Page
              </div>
            )}

            {pdfError && (
              <div className="text-slate-400 text-xs sm:text-sm font-semibold bg-slate-700/30 px-3 py-2 rounded-lg">
                Image Mode
              </div>
            )}

            <a
              href="/resume.jpg"
              download
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">Download</span>
            </a>
          </div>
        </div>
      </div>

      {/* PDF Display with better scaling */}
      <div className="w-full max-w-[98%] sm:max-w-[95%] lg:max-w-6xl xl:max-w-7xl">
        <div 
          ref={containerRef}
          className="relative w-full bg-gradient-to-b from-slate-200 to-slate-300 rounded-xl shadow-2xl overflow-hidden border-4 border-slate-700/30"
          style={{
            height: 'calc(100vh - 200px)',
            minHeight: '500px',
            cursor: scale > 1.0 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            touchAction: 'none',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove} 
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div
              ref={contentRef}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            >
              {!pdfError ? (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex flex-col items-center justify-center gap-4 p-12">
                      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="text-slate-700 text-lg font-semibold">Loading Resume...</div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={baseScale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="shadow-2xl rounded-lg overflow-hidden"
                  />
                </Document>
              ) : (
                <img
                  src={resumeImageUrl}
                  alt="Resume"
                  className="shadow-2xl rounded-lg max-w-full h-auto"
                  draggable="false"
                  style={{ maxHeight: 'calc(100vh - 300px)' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {(numPages || pdfError) && (
        <div className="mt-4 text-slate-400 text-xs sm:text-sm text-center px-4">
          <div className="hidden sm:block bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
            {!pdfError && numPages > 1 
              ? "💡 Ctrl+Scroll to zoom • Click & drag to move • Use arrows to navigate"
              : "💡 Ctrl+Scroll to zoom • Click & drag to move"
            }
          </div>
          <div className="block sm:hidden bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
            💡 Pinch to zoom • Drag to move
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;