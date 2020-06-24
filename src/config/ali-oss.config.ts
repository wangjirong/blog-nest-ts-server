export const config = {
	client: {
		endpoint: 'oss-accelerate.aliyuncs.com', // endpoint域名
		accessKeyId: 'LTAI4FvSEqYkYKGxnEmMg2gq', // 账号
		accessKeySecret: 'iwaOjFQ7RvCGWhHORKodrFqfAo84ka', // 密码
		bucket: 'iri-blog', // 存储桶
		internal: false, // 是否使用阿里云内部网访问
		secure: true, // 使用 HTTPS
		cname: false, // 自定义endpoint
		timeout: '90s'
	},
	domain: '', // 自定义域名
};