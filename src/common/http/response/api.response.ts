export class CoreApiResponse<T> {
	public readonly success: boolean;
	public readonly timestamp: number | string;
	public readonly data: T | null;
	public readonly error: any;

	private constructor(success: boolean, data?: T, error?: any) {
		this.success = success;
		this.data = data || null;
		this.timestamp = new Date().toLocaleString('ru-RU', {
			timeZone: 'Asia/Tashkent',
		});
		this.error = error;
	}

	public static success<T>(data: T): CoreApiResponse<T> {
		return new CoreApiResponse(true, data, null);
	}

	public static error<T>(error?: Error): CoreApiResponse<T> {
		return new CoreApiResponse(false, null, error?.message);
	}
}
