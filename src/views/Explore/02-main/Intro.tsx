import './ExploreMainStyles.css';

const Intro = () => {
	return (
		<section className="intro" id="intro" style={{ height: '100vh' }}>
			<h1 style={{ marginBottom: '100px' }}>Introduction</h1>
			<p>
				AO is a decentralized computing system inspired by the actor-oriented paradigm. It’s a single system image
				capable of supporting numerous parallel processes without the constraints of current decentralized computation
				models, emphasizing network verifiability and minimized trust requirements.
			</p>
			<p>
				The architecture of AO is modular, facilitating seamless integration with existing smart contract platforms and
				allowing customization across computational resources, virtual machines, security mechanics, and payment
				mechanisms. Key functionalities include unrestricted resource utilization for hosted processes, direct
				integration with Arweave's permanent data storage capabilities, autonomous activation of contracts, and a
				comprehensive message-passing layer for inter-process coordination.
			</p>
		</section>
	);
};

export default Intro;
