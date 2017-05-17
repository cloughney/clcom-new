import * as React from 'react';

export default function Feed(props: undefined): JSX.Element {
	return (
		<section className="feed">
			<ul>
				<li>
					<div className="card layer-2 news">
						<article>
							<div className="heading purple">
								<h1>Showcase: Bash Shell in React</h1>
							</div>
							<section>
								Play with a bash shell in the console!
							</section>
						</article>
					</div>
				</li>
				<li>
					<div className="card layer-2 news">
						<article>
							<div className="heading green">
								<h1>Showcase: Bash Shell in React</h1>
							</div>
							<section>
								Play with a bash shell in the console!
							</section>
						</article>
					</div>
				</li>
				<li>
					<div className="card layer-2 news">
						<article>
							<div className="heading red">
								<h1>Showcase: Bash Shell in React</h1>
							</div>
							<section>
								Play with a bash shell in the console!
							</section>
						</article>
					</div>
				</li>
				<li>
					<div className="card layer-2 news">
						<article>
							<div className="heading blue">
								<h1>Showcase: Bash Shell in React</h1>
							</div>
							<section>
								Play with a bash shell in the console!
							</section>
						</article>
					</div>
				</li>
			</ul>
		</section>
	);
}
