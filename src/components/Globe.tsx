import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 3,
            mapSamples: 16000,
            mapBrightness: 1.2,
            baseColor: [0.05, 0.05, 0.15],
            markerColor: [0, 0.95, 1],
            glowColor: [0.1, 0.2, 0.4],
            markers: [
                { location: [37.7749, -122.4194], size: 0.08 }, // San Francisco
                { location: [40.7128, -74.006], size: 0.08 },   // New York
                { location: [51.5074, -0.1278], size: 0.08 },   // London
                { location: [35.6762, 139.6503], size: 0.08 },  // Tokyo
                { location: [28.6139, 77.209], size: 0.08 },    // Delhi
                { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney
            ],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.003;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        setTimeout(() => canvasRef.current && (canvasRef.current.style.opacity = '1'));

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: 600,
                    aspectRatio: '1',
                    opacity: 0,
                    transition: 'opacity 1s ease',
                }}
                className="drop-shadow-[0_0_50px_rgba(0,243,255,0.5)]"
            />
        </div>
    );
}
