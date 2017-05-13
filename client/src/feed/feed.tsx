import * as React from 'react';

export default function Feed(props: undefined): JSX.Element {
	return (
		<section className="feed">
			<ul>
				<li>
					<div className="card layer-2 news">
						<article>
							<h1>Test Title</h1>
							<img src="images/green.png" />
							<section>
								test
							</section>
						</article>
					</div>
				</li>
				<li>
					<div className="card layer-2 news">
						<article>
							<h1>Test Title</h1>
							<img src="images/pink.png" />
							<section>
								test
							</section>
						</article>
					</div>
				</li>
				<li>
					<div className="card layer-2 news">
						<article>
							<h1>Test Title</h1>
							<img src="images/blue.png" />
							<section>
								test
							</section>
						</article>
					</div>
				</li>
				<li>
					<div className="card layer-2 news">
						<article>
							<h1>Test Title</h1>
							<img src="images/green.png" />
							<section>
								test
							</section>
						</article>
					</div>
				</li>
			</ul>
		</section>
	);
}
