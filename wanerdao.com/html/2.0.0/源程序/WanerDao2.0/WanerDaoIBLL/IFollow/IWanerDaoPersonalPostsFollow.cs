using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanerDao2.WanerDaoModel.Follow;
using WanerDao2.WanerDaoModel.Post;

namespace WanerDao2.WanerDaoIBLL.IFollow
{
    public interface IWanerDaoPersonalPostsFollow
    {
        string CreatePersonalPostsFollow(PersonalPostsFollowModel model);

        string CancelPersonalPostsFollow(string userId, string PostsId);

        string CancelPersonalPostsFollow(string id);

        bool HasPersonalPostsFollow(string userId, string PostsId);

        string GetPersonalPostsFollow(int pageCurrent, int pageSize, string where);
    }
}
