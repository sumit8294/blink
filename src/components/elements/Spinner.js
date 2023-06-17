import './spinner.css';
const Spinner = () =>{

	return(

		<span className="spinner-container">
			<svg role="img" aria-label="Mouth and eyes come from 9:00 and rotate clockwise into position, right eye blinks, then all parts rotate and merge into 3:00" className="smiley" viewBox="0 0 128 128" width="128px" height="128px">
				<defs>
					<clipPath id="smiley-eyes">
						<circle className="smiley__eye1" cx="64" cy="64" r="8" transform="rotate(-40,64,64) translate(0,-56)" />
						<circle className="smiley__eye2" cx="64" cy="64" r="8" transform="rotate(40,64,64) translate(0,-56)" />
					</clipPath>
					<linearGradient id="smiley-grad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#000" />
						<stop offset="100%" stopColor="#fff" />
					</linearGradient>
					<mask id="smiley-mask">
						<rect x="0" y="0" width="128" height="128" fill="url(#smiley-grad)" />
					</mask>
				</defs>
				<g strokeLinecap="round" strokeWidth="12" strokeDasharray="175.93 351.86">
					<g>
						<rect fill="#02aab0" width="128" height="64" clipPath="url(#smiley-eyes)" />
						<g fill="none" stroke="#02aab0">
							<circle className="smiley__mouth1" cx="64" cy="64" r="56" transform="rotate(180,64,64)" />
							<circle className="smiley__mouth2" cx="64" cy="64" r="56" transform="rotate(0,64,64)" />
						</g>
					</g>
					<g mask="url(#smiley-mask)">
						<rect fill="#00cdac" width="128" height="64" clipPath="url(#smiley-eyes)" />
						<g fill="none" stroke="#00cdac">
							<circle className="smiley__mouth1" cx="64" cy="64" r="56" transform="rotate(180,64,64)" />
							<circle className="smiley__mouth2" cx="64" cy="64" r="56" transform="rotate(0,64,64)" />
						</g>
					</g>
				</g>
			</svg>
		</span>
	)
}

export default Spinner;
