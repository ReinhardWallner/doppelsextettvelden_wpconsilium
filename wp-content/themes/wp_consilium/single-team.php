<?php
/**
 * The Template for displaying all single team.
 *
 * @package cshero
 */
global $smof_data,$breadcrumb;

get_header(); ?>
	<div id="primary" class="content-area<?php if($breadcrumb == '0'){ echo ' no_breadcrumb'; }; ?>">
        <div class="container">
			<main id="main" class="site-main" role="main">

				<?php while ( have_posts() ) : the_post(); ?>
					<?php $team_layout = 'layout1' ?>
					<div class="cs-team-wrap <?php echo $team_layout; ?>">
						<?php get_template_part( 'framework/templates/team/single', $team_layout); ?>
					</div>

					<?php
						/* latest work by user team */
						$category = get_post_meta(get_the_ID(), 'cs_portfolio_category', true);

						/* process category */
                        if(is_array($category) && !empty($category)){
                            $category = implode(',', $category);
                        } else {
                            $category = "";
                        }
                        /* render portfolio carousel */
                        echo do_shortcode('[cs-portfolio-carousel
                                                    styles="style-1"
                                                    crop_image="'.$smof_data['team_cr_crop_image'].'"
                                                    rows="1"
                                                    auto_scroll="'.$smof_data['team_cr_auto_scroll'].'"
                                                    show_nav="1"
                                                    posts_per_page="'.$smof_data['team_cr_post_per_page'].'"
                                                    orderby="none"
                                                    order="none"
                                                    category="'.$category.'"
                                                    title="'.$smof_data['team_cr_title'].get_the_title().'"
                                                    width_image="'.$smof_data['team_cr_width_image'].'"
                                                    height_image="'.$smof_data['team_cr_height_image'].'"
                                                    width_item="'.$smof_data['team_cr_width_item'].'"
                                                    margin_item="'.$smof_data['team_cr_margin_item'].'"
                            ]');
					?>
				<?php endwhile; ?>

			</main><!-- #main -->
        </div>
	</div><!-- #primary -->
<?php get_footer(); ?>