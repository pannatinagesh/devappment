import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * Splits raw participant text into a clean list.
 * Separators supported: comma, spaces/tabs, and new lines.
 */
const parseParticipants = (raw: string): string[] =>
    raw.split(/[\s,]+/).map((name) => name.trim()).filter((data) => data.length > 0)

/**
 * Fisher-Yates (Knuth) shuffle. Returns a new shuffled array
 * without mutating the input.
 */
const fisherYatesShuffle = <T,>(names: T[]): T[] => {
    const arr = [...names]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

/**
 * Distributes shuffled participants round-robin across `teamCount` teams
 * so team sizes stay as balanced as possible.
 */
const distributeIntoTeams = (participants: string[], teamCount: number): string[][] => {
    const teams: string[][] = Array.from({ length: teamCount }, () => []);
    const shuffled = fisherYatesShuffle(participants);
    console.log(shuffled, teams)
    shuffled.forEach((participant, index) => {
        teams[index % teamCount].push(participant)
    });
    return teams;
};

const RandomParticipants = () => {
    const [participantsText, setParticipantsText] = useState('');
    const [numberOfTeams, setNumberOfTeams] = useState(2);
    const [teams, setTeams] = useState<string[][]>([]);
    const [error, setError] = useState<string | null>(null);
console.log(teams)

    const handleGenerate = () => {
        const participants = parseParticipants(participantsText);

        if (numberOfTeams < 1) {
            setError('There must be at least one team.');
            setTeams([]);
            return;
        }

        if (participants.length === 0) {
            setError('Please enter at least one participant.');
            setTeams([]);
            return;
        }

        if (participants.length < numberOfTeams) {
            setError(
                `You have ${participants.length} participant(s) but asked for ${numberOfTeams} teams. Add more participants or reduce the number of teams.`
            );
            setTeams([]);
            return;
        }

        setError(null);
        setTeams(distributeIntoTeams(participants, numberOfTeams));
    };

    const handleReset = () => {
        setParticipantsText('');
        setNumberOfTeams(2);
        setTeams([]);
        setError(null);
    };

    const participantCount = parseParticipants(participantsText).length;

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-[#001b71]">Random Team Generator</h1>
                <p className="text-sm text-muted-foreground">
                    Enter participants separated by comma, space, or new line, then generate balanced teams.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="participants" className="text-sm font-medium">
                    Participants{' '}
                    <span className="text-muted-foreground">({participantCount} entered)</span>
                </label>
                <textarea
                    id="participants"
                    value={participantsText}
                    onChange={(e) => setParticipantsText(e.target.value)}
                    placeholder={'e.g. Alice, Bob\nCharlie Dave\nEve'}
                    rows={6}
                    className={cn(
                        'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors',
                        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                        'disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="team-count" className="text-sm font-medium">
                    Number of teams
                </label>
                <Input
                    id="team-count"
                    type="number"
                    min={1}
                    value={numberOfTeams}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setNumberOfTeams(Number.isNaN(value) ? 1 : Math.max(1, value));
                    }}
                    className="w-32"
                />
            </div>

            <div className="flex gap-3">
                <Button onClick={handleGenerate}>Generate Teams</Button>
                <Button variant="outline" onClick={handleReset}>
                    Reset
                </Button>
            </div>

            {error && (
                <p className="text-sm font-medium text-destructive" role="alert">
                    {error}
                </p>
            )}

            {teams.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {teams.map((team, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-input p-4 shadow-sm"
                        >
                            <h2 className="mb-2 font-semibold text-[#001b71]">
                                Team {index + 1}{' '}
                                <span className="text-xs font-normal text-muted-foreground">
                                    ({team.length})
                                </span>
                            </h2>
                            <ul className="flex flex-col gap-1 text-sm">
                                {team.map((member, memberIndex) => (
                                    <li key={memberIndex}>{member}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RandomParticipants;
