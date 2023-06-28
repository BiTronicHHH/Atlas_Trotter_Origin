import { getIsProfileOwner, getProfile } from '@/api/user';
import ImgDefaultPp from '@/assets/images/defaultPp.jpg';
import LoadingScreen from '@/components/ui/LoadingScreen';
import PrivateProfile from '@/components/ui/PrivateProfile';
import { auth } from '@/lib/firebase';
import Profile from '@/types/Profile';
import { InstagramOutlined, WarningOutlined } from '@ant-design/icons';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import router from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Container from '../components/ui/Container';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

const Col = dynamic(() => import('antd').then((module) => module.Col));
const Row = dynamic(() => import('antd').then((module) => module.Row));
const Space = dynamic(() => import('antd').then((module) => module.Space));
const Tag = dynamic(() => import('antd').then((module) => module.Tag));

const Map = dynamic(() => import('@/components/Map'));
const Results = dynamic(() => import('@/components/Results'));
const UpdateUserModal = dynamic(() => import('@/components/UpdateUserModal'));

interface Props {
  profile: Profile;
  customLink: string;
}

const ProfilePage: React.FC<Props> = ({ profile, customLink }) => {
  const { t } = useTranslation('profile');
  const [user, loading] = useAuthState(auth);
  const [isUpdateUserModalVisible, setIsUpdateUserModalVisible] =
    useState(false);
  const [isOwnerState, setIsOwnerState] = useState(false);
  const [profilePic, setProfilePic] = useState<Buffer>();

  useEffect(() => {
    async function fetchIsOwner() {
      const token = await user?.getIdToken();
      const isProfileOwner = await getIsProfileOwner(customLink, token ?? '');
      setIsOwnerState(isProfileOwner);
    }

    if (user && !profile.isOwner) {
      fetchIsOwner();
    }
  }, [customLink, profile, user]);

  const handlePfpUpdate = (newPfp: Buffer) => {
    setProfilePic(newPfp);
  };

  const handleOpenUpdateUserModal = () => {
    setIsUpdateUserModalVisible(true);
  };

  const handleCloseUpdateUserModal = (refresh: boolean) => {
    setIsUpdateUserModalVisible(false);
    if (refresh) {
      router.reload();
    }
  };

  return (
    <>
      <NextSeo
        title={`Atlas Trotter - ${customLink}`}
        description={t('Atlas trotter personal profile')}
      />
      {loading ? (
        <LoadingScreen />
      ) : !profile.isPublic && !profile.isOwner ? (
        <PrivateProfile />
      ) : (
        <>
          {isUpdateUserModalVisible && (
            <UpdateUserModal
              open={isUpdateUserModalVisible}
              onClose={handleCloseUpdateUserModal}
              userId={user?.uid ?? ''}
              handlePfpUpdate={handlePfpUpdate}
            />
          )}
          <Container className="flex flex-col items-center justify-center">
            <Row className="w-full max-w-[900px] mt-4 px-1 mb-1">
              <Col span={8}>
                <div
                  className="small:w-40 small:h-40 rounded-full m-auto overflow-hidden flex justify-center items-center"
                  style={{ aspectRatio: '1' }}>
                  <img
                    src={
                      profilePic
                        ? `data:image/jpg;base64,${profilePic.toString(
                            'base64',
                          )}`
                        : profile.profilePicture
                        ? `data:image/jpg;base64,${Buffer.from(
                            profile.profilePicture.data,
                          ).toString('base64')}`
                        : ImgDefaultPp.src
                    }
                    className="w-full h-full object-cover"
                    alt={t('Profile picture')}
                  />
                </div>
              </Col>
              <Col span={15} offset={1} className="self-center">
                <Space className="mb-2">
                  <div className="text-base sm:text-lg font-medium pr-2">
                    {profile.firstName} {profile.lastName}
                  </div>
                  {(profile.isOwner || isOwnerState) && (
                    <button
                      className="text-sm sm:text-md flex justify-center items-center hover:bg-[#dbdbdb] py-[7px] w-[110px] sm:w-[125px] rounded-lg font-medium bg-[#efefef]"
                      onClick={handleOpenUpdateUserModal}>
                      {t('Update profile')}
                    </button>
                  )}
                </Space>
                <div className="mb-2">
                  {profile.ig != '' && (
                    <Link
                      href={`https://instagram.com/${profile.ig}`}
                      target="_blank">
                      <Tag icon={<InstagramOutlined />} color="#9C6D96">
                        @{profile.ig}
                      </Tag>
                    </Link>
                  )}
                </div>
                <div className="text-base whitespace-pre">
                  {profile.description}
                </div>
              </Col>
            </Row>
            {!profile.isPublic && (profile.isOwner || isOwnerState) && (
              <Tag icon={<WarningOutlined />} color="orange">
                {t('private_profile')}
              </Tag>
            )}
            <Map
              visitedDestinations={profile.visitedDestinations}
              visitedColor1={profile.visitedColor1}
              visitedColor2={profile.visitedColor2}
              visitedColor3={profile.visitedColor3}
              notVisitedColor1={profile.notVisitedColor1}
              notVisitedColor2={profile.notVisitedColor2}
              notVisitedColor3={profile.notVisitedColor3}
              colorBorders={profile.colorBorders}
            />
          </Container>
          <Results
            visitedDestinations={profile.visitedDestinations}
            user={user}
            isProfileContext={true}
          />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { token } = nookies.get(ctx);
  const { customLink } = ctx.query;

  let profile = null;

  try {
    profile = await getProfile(customLink as string, token);
  } catch (e) {
    return;
  }

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile,
      customLink,
    },
  };
}

export default ProfilePage;
