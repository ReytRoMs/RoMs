"use client";

import { SolitoImage } from "solito/image";
import { Link } from "solito/link";

import { Check } from "../Icons";
import { X } from "../Icons/X";

import "./index.css";
import { QuestionResult } from "@repo/types";

interface IResultsTable {
	results: QuestionResult[];
}

export const ResultsTable = ({ results }: IResultsTable) => {
	return (
		<table>
			<thead>
				<tr>
					<th id='video-column' scope='col'>
						Video
					</th>
					<th id='your-answer-column' scope='col'>
						Your Answer
					</th>
					<th id='correct-answer-column' scope='col'>
						Correct Answer
					</th>
					<th id='your-answer-icon-column' scope='col' />
				</tr>
			</thead>

			<tbody>
				{results?.map((result) => (
					<tr key={result.youtubeId}>
						<td id='video-column' className='video-overlay'>
							<Link href={`https://www.youtube.com/watch?v=${result.youtubeId}`} target='_blank'>
								<SolitoImage
									alt={`Video placeholder for video ${result.youtubeId}`}
									src={{
										src: `https://img.youtube.com/vi/${result.youtubeId}/hqdefault.jpg`,
										width: 72,
										height: 40
									}}
									resizeMode={"cover"}
									// Required properties which aren't specified in the Solito Image documentation
									contentFit={""}
									onLayout={() => {}}
								/>
							</Link>
						</td>
						<td id='your-answer-column'>{result.usersAnswer}</td>
						<td id='correct-answer-column'>{result.correctAnswer}</td>
						<td id='your-answer-icon-column'>
							{result.usersAnswer === result.correctAnswer ? <Check colour='$green' /> : <X colour='$validError' />}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
