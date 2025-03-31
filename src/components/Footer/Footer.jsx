import React from 'react'
import Container from '../container/Container'

function Footer() {
    return (
        <footer className='sticky bottom-0'>
            <Container>   
                <p className='bg-zinc-950 text-white text-center border-t-2 border-zinc-700'>&copy; 2024 Company Name. All rights reserved.</p>
            </Container>
        </footer>
    )
}

export default Footer
