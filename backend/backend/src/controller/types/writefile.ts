import * as fs from 'fs';

export const writeFile = (filePath: string, data: any): Promise<void> => {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
			if (err) {
				return reject(err);
			}
			resolve();
		});
	});
};



