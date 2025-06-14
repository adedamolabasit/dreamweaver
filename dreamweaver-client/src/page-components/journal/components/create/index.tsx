import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Loader2, Send } from "lucide-react";
import { useCreateJournal } from "../../../../hooks/useJournal.";
import { useToast } from "../../../../components/Toast";
import DreamLoader from "../../../../components/Loader/DreamLoader";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const SomniRec: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { mutate: creatJournal, isPending } = useCreateJournal();

  const { showDream, showError } = useToast();

  const { isConnected } = useAccount();

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError(
          "Speech recognition not supported in your browser. Try Chrome or Edge."
        );
        return;
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript((prev) => {
          const prevFinal = prev.replace(/\[.*?\]/g, "").trim();
          return `${prevFinal} ${finalTranscript}[${interimTranscript}]`;
        });
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setError(`Speech recognition error: ${event.error}`);
        stopRecording();
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    setError(null);
    setTranscript("");
    setIsProcessing(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start(100);

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      setIsRecording(true);
    } catch (err) {
      setError("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsRecording(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!transcript.trim()) return;

    setIsProcessing(true);
    setError("");

    const cleanTranscript = transcript.replace(/\[.*?\]/g, "").trim();

    creatJournal(
      { transcript: cleanTranscript },
      {
        onSuccess: () => {
          showDream("Journal Created", "Dream added to journal successfully");
          navigate(`/weave`);
        },
        onError: () => {
          showError("Failed to save journal entry. Please try again.");
        },
        onSettled: () => {
          setIsProcessing(false);
        },
      }
    );
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (isPending)
    return <DreamLoader message="Adding your dream to journal..." size="lg" />;

  return (
    <div className="w-full flex flex-col items-center max-w-4xl mx-auto h-full p-4 mb-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
          SomniRec
        </h2>
        <p className="text-blue-100/80 max-w-2xl font-light">
          Voice-powered dream journal. Speak your dreams and we'll transcribe
          and store them.
        </p>
      </div>

      {error && (
        <div className="w-full mb-4 p-3 bg-red-900/50 text-red-100 rounded-lg">
          {error}
        </div>
      )}

      <div className="w-full mb-10">
        <div
          className={`relative flex flex-col items-center justify-center p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
            isRecording
              ? "bg-gradient-to-br from-purple-900/40 to-pink-800/30 shadow-lg shadow-pink-900/30 h-64"
              : "bg-white/5 h-64"
          }`}
        >
          <div className={`mic-visualizer ${isRecording ? "active" : ""}`}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="visualizer-bar bg-gradient-to-t from-purple-400 to-pink-300"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  height: isRecording ? `${Math.random() * 5}px` : "5px",
                  opacity: isRecording ? 0.8 : 0.3,
                  transition: "height 0.1s ease-out",
                }}
              />
            ))}
          </div>

          <button
            onClick={toggleRecording}
            disabled={isProcessing}
            className={`relative z-10 p-6 rounded-full transition-all duration-300 ${
              isRecording
                ? "bg-pink-500 shadow-lg shadow-pink-500/30 scale-110"
                : "bg-purple-700 hover:bg-purple-600"
            } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isProcessing ? (
              <Loader2 size={28} className="animate-spin" />
            ) : isRecording ? (
              <MicOff size={28} />
            ) : (
              <Mic size={28} />
            )}
          </button>

          <p className="mt-6 text-sm font-light">
            {isProcessing
              ? "Processing your dream..."
              : isRecording
              ? "Recording... Speak your dream"
              : "Tap to start recording"}
          </p>
        </div>

        {(transcript || !isRecording) && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
            <div className="min-h-24 max-h-48 overflow-y-auto mb-4">
              <p className="font-light text-white/90">
                {transcript.replace(/\[.*?\]/g, "").trim() ||
                  "Your transcription will appear here..."}
              </p>
            </div>
            {isConnected ? (
              transcript && !isRecording ? (
                <button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Save to Journal
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 w-full py-3 bg-purple-700 rounded-lg opacity-50 cursor-not-allowed">
                  {isRecording
                    ? "Recording in progress..."
                    : "Speak something to save"}
                </div>
              )
            ) : (
              <div className="flex items-center justify-center gap-2 w-full py-3 bg-purple-700 rounded-lg opacity-50 cursor-not-allowed">
                Please connect your wallet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SomniRec;
