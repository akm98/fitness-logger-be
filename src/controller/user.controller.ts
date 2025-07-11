/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
// eslint-disable

export const userWebhook = async (req: any, res: any) => {
  const event = req.body

  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = event.data

    await UserModel.create({
      clerkId: id,
      email: email_addresses[0]?.email_address,
      firstName: first_name,
      lastName: last_name
    })
  }

  res.status(200).send('Webhook received')
}

