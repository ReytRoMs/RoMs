"use client";

import { SolitoImage } from "solito/image";

import { Check } from "../Icons";
import { X } from "../Icons/X";

import "./index.css";
import { useBreakpointValue } from "@gluestack-style/react";

interface IResultsTable {
	results: {
		videoId: string;
		yourAnswer: string;
		correctAnswer: string;
	}[];
}

export const ResultsTable = ({ results }: IResultsTable) => {
	const tableCellStyling = useBreakpointValue({
		base: "unset",
		md: "150px"
	});

	const correctAnswerColumn = useBreakpointValue({
		base: "none",
		md: "table-cell"
	});

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
					<th id='correct-answer-column' style={{ display: correctAnswerColumn }} scope='col'>
						Correct Answer
					</th>
					<th id='your-answer-icon-column' scope='col' />
				</tr>
			</thead>
			<tbody>
				{results?.map((result) => (
					<tr key={result.videoId}>
						<td id='video-column'>
							<SolitoImage
								alt={`Video placeholder for video ${result.videoId}`}
								src={{
									src: `https://img.youtube.com/vi/${result.videoId}/hqdefault.jpg`,
									width: 72,
									height: 40
								}}
								resizeMode={"cover"}
								// Required properties which aren't specified in the Solito Image documentation
								contentFit={""}
								onLayout={() => {}}
							/>
						</td>
						<td id='your-answer-column' style={{ maxWidth: tableCellStyling }}>
							{result.yourAnswer}
						</td>
						<td id='correct-answer-column' style={{ maxWidth: tableCellStyling, display: correctAnswerColumn }}>
							{result.correctAnswer}
						</td>
						<td id='your-answer-icon-column' style={{ maxWidth: tableCellStyling }}>
							{result.yourAnswer === result.correctAnswer ? <Check colour='$green' /> : <X colour='$validError' />}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
