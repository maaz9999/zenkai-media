"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MediaAsset } from "../assetsData";

interface MediaModalProps {
  asset: MediaAsset | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function MediaModal({ asset, onClose, onPrev, onNext, hasPrev, hasNext }: MediaModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!asset) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    if (asset) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [asset, onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <AnimatePresence>
      {asset && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-dialog"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="modal-badge">{asset.type}</span>
                <h3>{asset.title}</h3>
              </div>
              <button className="modal-close" onClick={onClose} aria-label="Close modal">
                ✕
              </button>
            </div>

            <div className="modal-media-wrapper">
              {hasPrev && (
                <button className="modal-nav modal-nav-prev" onClick={onPrev} aria-label="Previous item">
                  ‹
                </button>
              )}

              {asset.isVideo ? (
                <video
                  src={asset.src}
                  controls
                  autoPlay
                  playsInline
                  className="modal-media-content"
                />
              ) : (
                <img
                  src={asset.src}
                  alt={asset.title}
                  className="modal-media-content"
                />
              )}

              {hasNext && (
                <button className="modal-nav modal-nav-next" onClick={onNext} aria-label="Next item">
                  ›
                </button>
              )}
            </div>

            <div className="modal-footer">
              <span className="modal-file-info">File: {asset.file}</span>
              {asset.url && (
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-visit-link"
                >
                  Visit Live Site ↗
                </a>
              )}
              <span className="modal-brand">ZENKAI MEDIA ASSET</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
