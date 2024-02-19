import { useThree, extend, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({OrbitControls})

export default function Particle(){
    const cubeRef = useRef() 
    const {camera,gl} = useThree()
    const particlesCount = 2500
    const objectsDistance = 4
    const positions = new Float32Array(particlesCount*3)
    let value = Math.round(Math.random() * 10)
    const [color,setColor] = useState()

    for(let i = 0;i<particlesCount;i++){
        positions[i*3]  =  (Math.random()-0.5)*10            //x
        positions[i*3+1]= objectsDistance*0.5 - Math.random() * objectsDistance* 3           //y
        positions[i*3+2]= (Math.random()-0.5 )*10                //z
    }

    useFrame((state, delta)=>{
        cubeRef.current.rotation.y += delta
        cubeRef.current.rotation.x += delta
        cubeRef.current.rotation.z += delta
        if (localStorage.getItem('theme') === "dark") {
            setColor ('green')
           }else{
            setColor('blue')   
       }
    })
    return<>
    <orbitControls args={[camera, gl.domElement]} />
    <directionalLight  position={[1,2,3]} intensity={1.5}/>
    <ambientLight intensity={0.5}/>

    {/* <mesh>
        <bufferGeometry >
            <bufferAttribute 
                attach="attributes-position"
                count={particlesCount}
                itemSize={1}
                array={positions}
            />
        </bufferGeometry>
        <pointsMaterial size={0.03} sizeAttenuation={true} color={color} />
    </mesh> */}

    <group ref={cubeRef}>
        <mesh position={[-2,0,0]} scale={1.5}>
            <sphereGeometry args={[1.5 , 32, 32]}/>
            <meshStandardMaterial args={[{'color':'orange'}]}/>
        </mesh>
        <mesh ref={cubeRef} position={[2,0,0]} scale={1.5}>
            <boxGeometry scale={1.5}/>
            <meshStandardMaterial args={[{'color':'blue'}]}/>
        </mesh>
    </group>
        
    </>
}