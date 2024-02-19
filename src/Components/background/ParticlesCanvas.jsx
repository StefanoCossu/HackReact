import { Canvas } from "@react-three/fiber"
import Particle from "./Particle"
export default function ParticlesCanvas(){
    return<> 
    <div className=" h-full w-full fixed top-0 left-0 overflow-hidden">  
    <Canvas>     
        <Particle/>
    </Canvas>
    </div>
        
    </>
    
}