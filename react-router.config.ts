import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	prerender: ['/*?'],
	dev: {
		port: 9931,
	},
} satisfies Config;
