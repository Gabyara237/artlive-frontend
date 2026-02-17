import { Link } from 'react-router'
import IconCard from '../IconCard/IconCard'
import IconExperience from '../icons/IconExperience'
import IconHandWork from '../icons/IconHandWork'
import IconInstructor from '../icons/IconInstructor'
import IconMeet from '../icons/IconMeet'
import './Landing.css'

import bgArtworks from'../../assets/bgArtworks.jpg'

const Landing =()=>{
    return (
        <div className="landing-container">
            <div className='hero-section' style={{ backgroundImage: `url(${bgArtworks})` }}>
                <div className='text'>
                    <h1>Discover Creative Workshops Near You</h1>
                    <p>Ignite your Inner artist. Join inspiring classes led by </p>
                    <p>passionate local creators and find new joy in hands-on learn</p>

                </div>
            </div>

            <h2> A living gallery curated by our community</h2>
            
            <Link to="/sign-up" className="highlight button">
                Join & Share your Art
            </Link>

            <h2> Ready to Unleash Your Creativity?</h2>
            <p>Sign up today for exclusive access to a world of creative experiences.</p>
            <div className='container-icons-description'>
                <IconCard className="icon-card" icon={<IconInstructor className="icon-landing"/>} description={`Learn From \nPassionate Instructors`} />
                <IconCard className="icon-card" icon={<IconHandWork className="icon-landing"/>} description={`Explore Hands \nOn Classes`}/>
                <IconCard classNam="icon-card" icon={<IconMeet className="icon-landing"/>} description={`Meet Local \nCreative Sould`}/>
                <IconCard classNam= "icon-card" icon = {<IconExperience className="icon-landing"/>} description={`No Experience \nNeeded`}/>
            </div>

            <Link to="/sign-up" className="highlight button">
                Sign Up Now
            </Link>
        </div>
    )
}

export default Landing