import React from "react";
import { FaArrowLeft, FaSpinner, FaRedo, FaClock, FaCheck } from "react-icons/fa";

const ICON_SIZE = 40;           // diameter of the step icon
const LEFT_COL_WIDTH = 56;      // width reserved for icon column
const STEP_ROW_HEIGHT = 90;     // fixed vertical space per step (controls spacing)

const stepsData = [
  {
    title: "Upload Complete",
    description: "Invoice file received and validated",
    time: "Completed at 4:00:00 pm",
    duration: "0.5s",
    status: "completed",
  },
  {
    title: "OCR Processing",
    description: "Extracting text from PDF using advanced OCR",
    time: "Completed at 4:00:15 pm",
    duration: "15.2s",
    status: "completed",
  },
  {
    title: "AI Analysis",
    description: "Identifying invoice structure and key data points",
    time: "Completed at 4:01:45 pm",
    duration: "32.1s",
    status: "completed",
  },
  {
    title: "Data Extraction",
    description: "Extracting vendor, amounts, line items, and metadata",
    time: "Completed at 4:02:17 pm",
    duration: "25.8s",
    status: "completed",
  },
  {
    title: "Validation",
    description: "Validating extracted data against business rules",
    time: "Started at 4:02:17 pm",
    duration: "",
    status: "processing",
    progress: 60, // <--- Progress percentage for validation
  },
  {
    title: "Quality Check",
    description: "Final confidence scoring and quality assessment",
    time: "",
    duration: "",
    status: "pending",
  },
];

export default function ProcessingPage() {
  const steps = stepsData;
  const totalSteps = steps.length;
  const totalSegments = Math.max(totalSteps - 1, 1);

  // index of last fully completed step
  const lastCompletedIndex = steps.map(s => s.status).lastIndexOf("completed");
  // index of the processing step (if any)
  const processingIndex = steps.findIndex(s => s.status === "processing");

  // Calculate overlay heights
  const completedPortion = lastCompletedIndex >= 0 ? (lastCompletedIndex / totalSegments) : 0;
  const processingPortion = processingIndex >= 0 ? (processingIndex / totalSegments) : 0;

  const completedPercent = `${completedPortion * 100}%`;
  const processingPercent = `${processingPortion * 100}%`;

  const overallProgress = 60;

  return (
    <div className="ProcessingPage" style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <button style={styles.backBtn}><FaArrowLeft />&nbsp;Back</button>
          <div style={{ fontSize: 15, color: "#111827" }}>
            Processing Status: <strong>office_supplies_quarterly.pdf</strong>
          </div>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={styles.processingBtn}><FaSpinner style={{ marginRight: 8 }} /> Processing</button>
          <button style={styles.rerunBtn}><FaRedo style={{ marginRight: 8 }} /> Re-Run Extraction</button>
        </div>
      </div>

      {/* Card */}
      <div style={styles.card}>
        <div style={styles.timelineHeader}>
          <FaClock style={{ color: "#2563eb", marginRight: 10 }} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>Processing Timeline</div>
        </div>

        {/* Progress */}
        <div style={styles.progressRow}>
          <div style={{ fontSize: 14 }}>Overall Progress</div>
          <div style={{ marginLeft: "auto", minWidth: 40, textAlign: "right", fontWeight: 600 }}>{overallProgress}%</div>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${overallProgress}%` }} />
        </div>

        {/* Steps Area */}
        <div
          style={{
             ...styles.stepsArea,
             paddingTop: ICON_SIZE / 2,
             paddingBottom: ICON_SIZE / 2 + 50,
             height: totalSegments * STEP_ROW_HEIGHT + ICON_SIZE + 100,
          }}
        >
          {/* Base Vertical Line */}
          <div
            style={{
              ...styles.verticalBase,
              left: LEFT_COL_WIDTH / 2 - 1,
              top: ICON_SIZE / 2,
              height: `calc(100% - ${ICON_SIZE / 2}px)`,
            }}
          />

          {/* Completed Overlay */}
          <div
            style={{
              ...styles.verticalOverlay,
              backgroundColor: "#22c55e",
              left: LEFT_COL_WIDTH / 2 - 1,
              top: ICON_SIZE / 2,
              height: `calc(${completedPercent} * (100% - ${ICON_SIZE / 2}px) / 100)`,
              display: lastCompletedIndex >= 0 ? "block" : "none",
            }}
          />

          {/* Processing Overlay */}
          <div
            style={{
              ...styles.verticalOverlay,
              backgroundColor: "#2563eb",
              left: LEFT_COL_WIDTH / 2 - 1,
              top: ICON_SIZE / 2,
              height: `calc(${processingPercent} * (100% - ${ICON_SIZE / 2}px) / 100)`,
              display: processingIndex >= 0 ? "block" : "none",
            }}
          />

          {/* Steps */}
          {steps.map((step, idx) => {
            const isProcessing = step.status === "processing";
            const colorTitle = step.status === "completed" ? "#16a34a" : isProcessing ? "#2563eb" : "#111827";
            const duration = step.duration || "";

            const extraMargin =
              step.title === "Validation"
                ? { marginTop: 30 }
                : step.title === "Quality Check"
                ? { marginTop: 50 }
                : {};

            return (
              <div key={idx} style={{ ...styles.stepRow, height: STEP_ROW_HEIGHT, ...extraMargin }}>
                {/* Left Column */}
                <div style={styles.leftCol}>
                  <div
                    style={{
                      ...styles.iconCircle,
                      backgroundColor: step.status === "completed" ? "#22c55e" : step.status === "processing" ? "#2563eb" : "#d1d5db",
                    }}
                  >
                    {step.status === "completed" ? (
                      <FaCheck color="#fff" size={18} />
                    ) : step.status === "processing" ? (
                      <FaSpinner style={{ color: "#fff", fontSize: 18, animation: "spin 1s linear infinite" }} />
                    ) : (
                      <div style={{ width: 10, height: 10, borderRadius: 5, background: "#fff" }} />
                    )}
                  </div>
                </div>

                {/* Content Column */}
                <div style={styles.contentCol}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: colorTitle }}>{step.title}</div>
                      <div style={{ flex: 1 }} />
                      {duration ? (
                        <div style={{ ...styles.durationBox, borderColor: isProcessing ? "#2563eb" : "#e5e7eb", color: isProcessing ? "#2563eb" : "#374151" }}>
                          {duration}
                        </div>
                      ) : null}
                    </div>

                    <div style={{ marginTop: 8, fontSize: 13, color: isProcessing ? "#2563eb" : "#4b5563" }}>
                      {step.description}
                    </div>

                    {step.time ? <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>{step.time}</div> : null}

                    {/* Progress bar for Validation step */}
                    {isProcessing && step.progress !== undefined && (
                      <div style={{ marginTop: 12 }}>
                        <div style={styles.validationProgressContainer}>
                          <div
                            style={{
                              ...styles.validationProgressFill,
                              width: `${step.progress}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* File Info + Results */}
      <div style={styles.infoRow}>
        <div style={styles.infoCard}>
          <h4 style={{ marginTop: 0 }}>File Information</h4>
          <div style={styles.infoRowItem}><strong>File Name:</strong><span style={styles.infoValue}>office_supplies_quarterly.pdf</span></div>
          <div style={styles.infoRowItem}><strong>Upload Date:</strong><span style={styles.infoValue}>2024-01-20</span></div>
          <div style={styles.infoRowItem}><strong>File Size:</strong><span style={styles.infoValue}>2.4 MB</span></div>
          <div style={styles.infoRowItem}><strong>Pages:</strong><span style={styles.infoValue}>3</span></div>
        </div>

        <div style={styles.infoCard}>
          <h4 style={{ marginTop: 0 }}>Extraction Results</h4>
          <div style={styles.infoRowItem}><strong>Confidence Score:</strong><span style={styles.badge}>89%</span></div>
          <div style={styles.infoRowItem}><strong>Fields Extracted:</strong><span style={styles.infoValue}>12/15</span></div>
          <div style={styles.infoRowItem}><strong>Line Items:</strong><span style={styles.infoValue}>3</span></div>
          <div style={styles.infoRowItem}><strong>Processing Time:</strong><span style={styles.infoValue}>45 seconds</span></div>
        </div>
      </div>

      {/* Button below cards */}
      <div style={{ textAlign: "left", marginTop: 20 }}>
        <button style={styles.downloadButton}>Download Original PDF</button>
      </div>

      {/* Spinner animation */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Styles object
const styles = {
  page: {
    fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
    color: "#111827",
    padding: 20,
    maxWidth: "1240px",
    background: "#fff",
    position: "relative",
    left: "240px",
    top: "2rem",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 18,
    flexWrap: "wrap",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
    flexShrink: 0,
  },
  processingBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    borderRadius: 8,
    background: "#e6f0ff",
    color: "#2563eb",
    border: "1px solid #2563eb",
    fontWeight: 600,
  },
  rerunBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: 8,
    background: "#fff",
    color: "#111827",
    border: "1px solid #e5e7eb",
    fontWeight: 600,
  },

  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  timelineHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 600,
  },

  progressRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    background: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 18,
  },
  progressFill: {
    height: "100%",
    background: "#0b1020",
    borderRadius: 8,
    transition: "width 0.25s ease",
  },

  stepsArea: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
  },
  verticalBase: {
    position: "absolute",
    width: 2,
    backgroundColor: "#d1d5db",
    zIndex: 0,
    borderRadius: 1,
  },
  verticalOverlay: {
    position: "absolute",
    width: 2,
    zIndex: 1,
    borderRadius: 1,
  },

  stepRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    position: "relative",
  },
  leftCol: {
    width: LEFT_COL_WIDTH,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexShrink: 0,
  },
  iconCircle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  contentCol: {
    flex: 1,
    paddingLeft: 12,
    position: "relative",
  },
  durationBox: {
    minWidth: 64,
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontWeight: 600,
    fontSize: 13,
    color: "#374151",
  },

  validationProgressContainer: {
    width: "100%",
    height: 4,
    background: "#e5e7eb",
    borderRadius: 6,
    overflow: "hidden",
  },
  validationProgressFill: {
    height: "100%",
    background: "#000000", // Black progress bar
    transition: "width 0.3s ease",
  },

  infoRow: {
    display: "flex",
    gap: 20,
    marginTop: 20,
    flexWrap: "wrap",
  },
  infoCard: {
    flex: "1 1 300px",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 20,
    boxSizing: "border-box",
  },
  infoRowItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 14,
  },
  infoValue: {
    marginLeft: 12,
    color: "#111827",
  },
  badge: {
    background: "#f3f4f6",
    padding: "4px 8px",
    borderRadius: 8,
    fontWeight: 700,
  },

  downloadButton: {
    border: "none",
    padding: "10px 20px",
    fontSize: 14,
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.3s ease",
  },
};
