CREATE TABLE `org_signups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orgName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`contactPhone` varchar(32) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `org_signups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_signups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`school` varchar(255) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `student_signups_id` PRIMARY KEY(`id`)
);
