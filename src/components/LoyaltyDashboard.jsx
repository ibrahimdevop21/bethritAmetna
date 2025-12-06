import React from 'react';

function tierProgress(points) {
	if (points < 100) {
		return { tier: 'bronze', percent: Math.min(100, (points / 100) * 100), nextAt: 100 };
	}
	if (points < 300) {
		return { tier: 'silver', percent: Math.min(100, ((points - 100) / 200) * 100), nextAt: 300 };
	}
	return { tier: 'gold', percent: 100, nextAt: null };
}

const exampleLoyalty = {
	points: 2450,
	tier: 'gold',
};

const exampleRewards = [
	{ id: 1, title: 'Free Bethrit Ametna Bottle', points: 500 },
	{ id: 2, title: 'Exclusive Tasting Kit', points: 900 },
	{ id: 3, title: 'VIP Factory Tour', points: 1500 },
];

const exampleRedemptions = [
	{ id: 1, title: 'Limited Edition Gift Box', points_spent: 800 },
	{ id: 2, title: 'Early Access Product Drop', points_spent: 400 },
];

export default function LoyaltyDashboard() {
	const points = exampleLoyalty.points;
	const { tier, percent, nextAt } = tierProgress(points);
	const nextDiff = typeof nextAt === 'number' ? Math.max(0, nextAt - points) : null;

	return (
		<div className="space-y-6">
			<div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
				<div className="space-y-4 rounded-2xl border border-amber-100/15 bg-gradient-to-br from-[#2a1b12] via-[#5b3a23] to-[#2a1b12] p-4 shadow-lg shadow-black/60">
					<div className="flex items-center justify-between gap-4">
						<div>
							<h3 className="text-sm font-semibold">Example points balance</h3>
							<p className="mt-1 text-xs text-amber-50/80">Illustrative balance employees can reference while entering customer details.</p>
						</div>
						<p className="text-2xl font-semibold tracking-[0.08em]">{points.toLocaleString()}</p>
					</div>
					<div className="mt-2">
						<div className="mb-1 flex items-center justify-between text-[0.7rem] text-amber-50/80">
							<span className="uppercase tracking-[0.18em]">Tier: {tier.toUpperCase()}</span>
							{nextAt && <span className="text-amber-50/80">{nextDiff} pts to next tier</span>}
						</div>
						<div className="h-2 w-full overflow-hidden rounded-full border border-amber-100/40 bg-black/40">
							<div
								className="h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-500"
								style={{ width: `${percent}%` }}
							/>
						</div>
						<p className="mt-1 text-[0.7rem] text-amber-50/80">
							This card is for illustration only and does not reflect live customer data.
						</p>
					</div>
				</div>
				<div className="space-y-3 rounded-2xl border border-amber-100/15 bg-black/40 p-4">
					<p className="text-xs text-neutral-100">
						Internal view:{' '}
						<span className="inline-flex items-center rounded-full border border-amber-200/40 bg-black/40 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-amber-100">
							Employee demo only
						</span>
					</p>
					<p className="text-xs text-neutral-300">
						Use this example to explain how points, tiers, and rewards will work once the production loyalty
						system is connected.
					</p>
				</div>
			</div>
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-semibold">Example rewards catalog</h3>
					<p className="text-[0.7rem] text-neutral-300">Employees can reference these while describing available rewards.</p>
				</div>
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{exampleRewards.map((reward) => (
						<div
							key={reward.id}
							className="flex flex-col justify-between rounded-2xl border border-amber-100/15 bg-black/40 p-4 text-xs text-neutral-100"
						>
							<div className="space-y-2">
								<p className="text-sm font-semibold truncate" title={reward.title}>
									{reward.title}
								</p>
								<p className="text-[0.7rem] text-neutral-300">{reward.points} pts</p>
							</div>
							<p className="mt-3 text-[0.7rem] text-neutral-400">
								Rewards and values shown here are examples only and may change before launch.
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="space-y-3 rounded-2xl border border-amber-100/15 bg-black/40 p-4">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-semibold">Example recent redemptions</h3>
					<p className="text-[0.7rem] text-neutral-400">Used to demonstrate what customers will see after launch.</p>
				</div>
				<ul className="space-y-2 text-xs text-neutral-100">
					{exampleRedemptions.map((r) => (
						<li key={r.id} className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2">
							<span className="truncate mr-2">{r.title}</span>
							<span className="text-[0.7rem] text-neutral-300">-{r.points_spent} pts</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
